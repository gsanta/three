#include "select_tool.h"

namespace spright_app {

	SelectTool::SelectTool(DocumentHandler* documentHandler, EventHandler* eventHandler) : m_DocumentHandler(documentHandler), m_EventHandler(eventHandler), Tool("select")
	{

	}

	void SelectTool::pointerDown(tool::PointerInfo& pointerInfo)
	{
	}

	void SelectTool::pointerUp(tool::PointerInfo& pointerInfo)
	{
		makeSelection(pointerInfo);
	}

	void SelectTool::pointerMove(tool::PointerInfo& pointerInfo)
	{
		if (!pointerInfo.isLeftButtonDown()) {
			return;
		}

		if (m_Data.size() > 0) {
			moveSelection(pointerInfo);
		}
		else {
			updateSelectionBox(pointerInfo);
		}
	}

	void SelectTool::updateSelectionBox(tool::PointerInfo& pointerInfo) {
		Document* document = this->m_DocumentHandler->getActiveDocument();
		auto tempLayer = this->m_DocumentHandler->getActiveDocument()->getLayer(DEFAULT_TEMP_LAYER_ID);
		tempLayer->clear();

		for (spright_engine::graphics::Sprite* sprite : m_SelectionSprites) {
			delete sprite;
		}

		m_SelectionSprites.clear();

		Vec2 down = document->getCamera()->screenToModel(pointerInfo.down);
		Vec2 curr = document->getCamera()->screenToModel(pointerInfo.curr);

		float startX = down.x < curr.x ? down.x : curr.x;
		float endX = down.x < curr.x ? curr.x : down.x;
		float startY = down.y < curr.y ? down.y : curr.y;
		float endY = down.y < curr.y ? curr.y : down.y;

		for (float x = startX; x < endX; x += 2 * m_DashSize) {
			spright_engine::graphics::Sprite* sprite = new spright_engine::graphics::Sprite(x, startY, m_DashSize, 0.1f, 0xff0000ff);
			spright_engine::graphics::Sprite* sprite2 = new spright_engine::graphics::Sprite(x, endY, m_DashSize, 0.1f, 0xff0000ff);

			tempLayer->add(sprite);
			tempLayer->add(sprite2);

			m_SelectionSprites.push_back(sprite);
			m_SelectionSprites.push_back(sprite2);
		}

		for (float y = startY; y < endY; y += 2 * m_DashSize) {
			spright_engine::graphics::Sprite* sprite = new spright_engine::graphics::Sprite(startX, y, m_DashSize, 0.1f, 0xff0000ff);
			spright_engine::graphics::Sprite* sprite2 = new spright_engine::graphics::Sprite(endX, y, m_DashSize, 0.1f, 0xff0000ff);

			tempLayer->add(sprite);
			tempLayer->add(sprite2);

			m_SelectionSprites.push_back(sprite);
			m_SelectionSprites.push_back(sprite2);
		}
	}

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

		spright_engine::graphics::Layer* layer = dynamic_cast<spright_engine::graphics::TileLayer*>(document->getActiveLayer());

		auto it = layer->getRenderables().begin();
		while (it != layer->getRenderables().end()) {
			const spright_engine::graphics::Bounds* bounds = (*it)->getBounds();

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
		spright_engine::graphics::TileLayer* tileLayer = dynamic_cast<spright_engine::graphics::TileLayer*>(document->getActiveLayer());

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
		}
	}

}