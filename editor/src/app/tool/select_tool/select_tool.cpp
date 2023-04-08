#include "select_tool.h"

namespace spright { namespace editor {

	SelectTool::SelectTool(DocumentStore* documentStore) : m_DocumentStore(documentStore), Tool("select")
	{
	}

	void SelectTool::pointerDown(PointerInfo& pointerInfo)
	{
		m_ActiveDrawing = m_DocumentStore->getActiveDocument().getDrawingAt(pointerInfo.curr);

		if (m_ActiveDrawing != nullptr) {
			m_SelectionBox.setTileLayer(m_ActiveDrawing->getForegroundLayer());
			m_IsMove = m_SelectionBox.isInsideSelection(pointerInfo.curr);

			if (!m_IsMove) {
				m_SelectionBox.start(pointerInfo.curr);
			}
		}
	}

	void SelectTool::pointerUp(PointerInfo& pointerInfo)
	{
		if (Vec2::distance(pointerInfo.down, pointerInfo.curr) < m_NoMovementTolerance) {
			makePointSelection(pointerInfo);
		}
		else {
			makeSelection(pointerInfo);
		}

		m_IsMove = false;
	}

	void SelectTool::pointerMove(PointerInfo& pointerInfo)
	{
		if (!pointerInfo.isLeftButtonDown()) {
			return;
		}

		if (m_IsMove) {
			moveSelection(pointerInfo);
			m_SelectionBox.move(pointerInfo.curr - pointerInfo.prev);
		}
		else {
			m_SelectionBox.setPosition(pointerInfo.curr);
		}
	}

	void SelectTool::makeSelection(PointerInfo& pointerInfo) {
		m_Data.clear();
		m_OrigPositions.clear();

		if (m_ActiveDrawing == nullptr) {
			return;
		}

		Vec2 down = pointerInfo.down;
		Vec2 curr = pointerInfo.curr;

		float startX = down.x < curr.x ? down.x : curr.x;
		float endX = down.x < curr.x ? curr.x : down.x;
		float startY = down.y < curr.y ? down.y : curr.y;
		float endY = down.y < curr.y ? curr.y : down.y;

		TileLayer& layer = m_ActiveDrawing->getActiveLayer();

		auto it = layer.getRenderables().begin();
		while (it != layer.getRenderables().end()) {
			const Bounds& bounds = (*it)->getBounds();

			if (bounds.minX > startX && bounds.maxX < endX && bounds.minY > startY && bounds.maxY < endY) {
				Rect2D* sprite = static_cast<Rect2D*>(*it);
				m_Data.push_back(sprite);
				m_OrigPositions.push_back(Vec2(sprite->getPosition().x, sprite->getPosition().y));
			}
			++it;
		}
	}

	void SelectTool::moveSelection(PointerInfo& pointerInfo) {
		if (m_ActiveDrawing == nullptr) {
			return;
		}

		TileLayer& tileLayer = m_ActiveDrawing->getActiveLayer();

		Vec2 down = pointerInfo.down;
		Vec2 curr = pointerInfo.curr;

		Vec2 move(curr - down);
		Vec2Int moveTile(move.x / tileLayer.getTileSize(), move.y / tileLayer.getTileSize());
		Vec2 finalMove(moveTile.x * tileLayer.getTileSize(), moveTile.y * tileLayer.getTileSize());

		for (int i = 0; i < m_Data.size(); i++) {
			Rect2D* sprite = m_Data[i];

			sprite->setPosition(m_OrigPositions[i]);
			Vec3 position = sprite->getPosition();

			sprite->setPosition(Vec2(position.x, position.y) + finalMove);

			Vec2Int tilePos = tileLayer.getTilePos(Vec2(position.x, position.y));
			int newTileIndex = tileLayer.getTileIndex(tilePos.x, tilePos.y);
			tileLayer.updateTileIndex(sprite->getTileIndex(), newTileIndex);
		}
	}

	void SelectTool::makePointSelection(PointerInfo& pointerInfo) {
				if (m_ActiveDrawing == nullptr) {
			return;
		}
		TileLayer& tileLayer = m_ActiveDrawing->getActiveLayer();
		Camera& camera = m_DocumentStore->getActiveDocument().getCamera();
		Vec2 model = camera.screenToModel(pointerInfo.curr);

		Vec2Int tilePos = tileLayer.getTilePos(model);
		int tileIndex = tileLayer.getTileIndex(tilePos.x, tilePos.y);
		Renderable2D* renderable = tileLayer.getAtTileIndex(tileIndex);

		if (renderable != nullptr) {
			Rect2D* sprite = static_cast<Rect2D*>(renderable);
			m_Data.push_back(sprite);
			m_OrigPositions.push_back(Vec2(sprite->getPosition().x, sprite->getPosition().y));

			Vec2 spritePos = sprite->getPosition2d();
			float tileSize = tileLayer.getTileSize();
		}
	}
}}
