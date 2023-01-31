#include "select_tool.h"

namespace spright {

	SelectTool::SelectTool(DocumentHandler* documentHandler, EventHandler* eventHandler) : m_DocumentHandler(documentHandler), m_EventHandler(eventHandler), Tool("select")
	{
		m_SelectionBox = new SelectionBox(m_DocumentHandler);
	}

	void SelectTool::pointerDown(tool::PointerInfo& pointerInfo)
	{
		Document* document = this->m_DocumentHandler->getActiveDocument();
		Vec2 curr = document->getCamera()->screenToModel(pointerInfo.curr);

		m_IsMove = m_SelectionBox->isInsideSelection(curr);

		if (!m_IsMove) {
			m_SelectionBox->start(curr);
		}
	}

	void SelectTool::pointerUp(tool::PointerInfo& pointerInfo)
	{
		if (Vec2::distance(pointerInfo.down, pointerInfo.curr) < m_NoMovementTolerance) {
			makePointSelection(pointerInfo);
		}
		else {
			makeSelection(pointerInfo);
		}

		m_IsMove = false;
	}

	void SelectTool::pointerMove(tool::PointerInfo& pointerInfo)
	{
		if (!pointerInfo.isLeftButtonDown()) {
			return;
		}

		Document* document = this->m_DocumentHandler->getActiveDocument();
		Vec2 curr = document->getCamera()->screenToModel(pointerInfo.curr);
		Vec2 prev = document->getCamera()->screenToModel(pointerInfo.prev);


		if (m_IsMove) {
			moveSelection(pointerInfo);
			m_SelectionBox->move(curr - prev);
		}
		else {

			//Vec2 down = document->getCamera()->screenToModel(pointerInfo.down);
			//float startX = down.x < curr.x ? down.x : curr.x;
			//float endX = down.x < curr.x ? curr.x : down.x;
			//float startY = down.y < curr.y ? down.y : curr.y;
			//float endY = down.y < curr.y ? curr.y : down.y;

			m_SelectionBox->update(curr);

			//updateSelectionBox(Vec2(startX, startY), Vec2(endX, endY));
		}
	}

	//void SelectTool::updateSelectionBox(Vec2 bottomLeft, Vec2 topRight) {
	//	Document* document = this->m_DocumentHandler->getActiveDocument();
	//	auto tempLayer = this->m_DocumentHandler->getActiveDocument()->getLayer(DEFAULT_TEMP_LAYER_ID);
	//	tempLayer->clear();

	//	for (engine::graphics::Sprite* sprite : m_SelectionSprites) {
	//		delete sprite;
	//	}

	//	m_SelectionSprites.clear();

	//	for (float x = bottomLeft.x; x < topRight.x; x += 2 * m_DashSize) {
	//		engine::graphics::Sprite* sprite = new engine::graphics::Sprite(x, bottomLeft.y, m_DashSize, 0.1f, 0xff0000ff);
	//		engine::graphics::Sprite* sprite2 = new engine::graphics::Sprite(x, topRight.y, m_DashSize, 0.1f, 0xff0000ff);

	//		tempLayer->add(sprite);
	//		tempLayer->add(sprite2);

	//		m_SelectionSprites.push_back(sprite);
	//		m_SelectionSprites.push_back(sprite2);
	//	}

	//	for (float y = bottomLeft.y; y < topRight.y; y += 2 * m_DashSize) {
	//		engine::graphics::Sprite* sprite = new engine::graphics::Sprite(bottomLeft.x, y, m_DashSize, 0.1f, 0xff0000ff);
	//		engine::graphics::Sprite* sprite2 = new engine::graphics::Sprite(topRight.x, y, m_DashSize, 0.1f, 0xff0000ff);

	//		tempLayer->add(sprite);
	//		tempLayer->add(sprite2);

	//		m_SelectionSprites.push_back(sprite);
	//		m_SelectionSprites.push_back(sprite2);
	//	}
	//}

	void SelectTool::makeSelection(tool::PointerInfo& pointerInfo) {
		m_Data.clear();
		m_OrigPositions.clear();

		Document* document = m_DocumentHandler->getActiveDocument();

		Vec2 down = document->getCamera()->screenToModel(pointerInfo.down);
		Vec2 curr = document->getCamera()->screenToModel(pointerInfo.curr);

		float startX = down.x < curr.x ? down.x : curr.x;
		float endX = down.x < curr.x ? curr.x : down.x;
		float startY = down.y < curr.y ? down.y : curr.y;
		float endY = down.y < curr.y ? curr.y : down.y;

		engine::graphics::Layer* layer = dynamic_cast<engine::graphics::TileLayer*>(document->getLayerHandler()->getActiveLayer());

		auto it = layer->getRenderables().begin();
		while (it != layer->getRenderables().end()) {
			const engine::graphics::Bounds* bounds = (*it)->getBounds();

			if (bounds->minX > startX && bounds->maxX < endX && bounds->minY > startY && bounds->maxY < endY) {
				Sprite* sprite = static_cast<Sprite*>(*it);
				m_Data.push_back(sprite);
				m_OrigPositions.push_back(Vec2(sprite->getPosition().x, sprite->getPosition().y));
			}
			++it;
		}

		m_EventHandler->emitDataChange();
	}

	void SelectTool::moveSelection(tool::PointerInfo& pointerInfo) {
		Document* document = m_DocumentHandler->getActiveDocument();
		engine::graphics::TileLayer* tileLayer = dynamic_cast<engine::graphics::TileLayer*>(document->getLayerHandler()->getActiveLayer());

		Vec2 down = document->getCamera()->screenToModel(pointerInfo.down);
		Vec2 curr = document->getCamera()->screenToModel(pointerInfo.curr);

		Vec2 move(curr - down);
		Vec2Int moveTile(move.x / tileLayer->getTileSize(), move.y / tileLayer->getTileSize());
		Vec2 finalMove(moveTile.x * tileLayer->getTileSize(), moveTile.y * tileLayer->getTileSize());

		for (int i = 0; i < m_Data.size(); i++) {
			Sprite* sprite = m_Data[i];
			
			sprite->setPosition(m_OrigPositions[i]);
			Vec3 position = sprite->getPosition();

			sprite->setPosition(Vec2(position.x, position.y) + finalMove);

			Vec2Int tilePos = tileLayer->getTilePos(Vec2(position.x, position.y));
			int newTileIndex = tileLayer->getTileIndex(tilePos.x, tilePos.y);
			tileLayer->updateTileIndex(sprite->getTileIndex(), newTileIndex);
		}
	}

	void SelectTool::makePointSelection(tool::PointerInfo& pointerInfo) {
		TileLayer* tileLayer = dynamic_cast<TileLayer*>(m_DocumentHandler->getActiveDocument()->getLayerHandler()->getActiveLayer());
		Camera* camera = m_DocumentHandler->getActiveDocument()->getCamera();
		Vec2 model = camera->screenToModel(pointerInfo.curr);

		Vec2Int tilePos = tileLayer->getTilePos(model);
		int tileIndex = tileLayer->getTileIndex(tilePos.x, tilePos.y);
		Renderable2D* renderable = tileLayer->getAtTileIndex(tileIndex);

		if (renderable != nullptr) {
			Sprite* sprite = static_cast<Sprite*>(renderable);
			m_Data.push_back(sprite);
			m_OrigPositions.push_back(Vec2(sprite->getPosition().x, sprite->getPosition().y));
			
			Vec2 spritePos = sprite->getPosition2d();
			float tileSize = tileLayer->getTileSize();
			//updateSelectionBox(Vec2(spritePos.x, spritePos.y), Vec2(spritePos.x + tileSize, spritePos.y + tileSize));
		}
	}
}