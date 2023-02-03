#include "erase_tool.h"

namespace spright { namespace tool {

	EraseTool::EraseTool(DocumentHandler* documentHandler, EventHandler* eventHandler) : m_DocumentHandler(documentHandler), m_EventHandler(eventHandler), Tool("erase")
	{

	}

	void EraseTool::pointerMove(PointerInfo& pointerInfo)
	{
		setEraserPosition(pointerInfo);

		if (pointerInfo.isDown) {
			erase(pointerInfo);
		}
	}

	void EraseTool::setEraserPosition(PointerInfo& pointerInfo) {
		TileLayer* activeLayer = dynamic_cast<TileLayer*>(m_DocumentHandler->getActiveDocument()->getLayerHandler()->getActiveLayer());

		float halfEraserSize = activeLayer->getTileSize() * static_cast<float>(m_EraserSize) / 2.0f;

		int tileIndex = activeLayer->getTileIndex(pointerInfo.curr);
		Vec2 pos = activeLayer->getCenterPos(tileIndex);

		m_TopLine->setCenterPosition(pos + Vec2(0, halfEraserSize));
		m_RightLine->setCenterPosition(pos + Vec2(halfEraserSize, 0));
		m_BottomLine->setCenterPosition(pos + Vec2(0, -halfEraserSize));
		m_LeftLine->setCenterPosition(pos + Vec2(-halfEraserSize, 0));
	}

	void EraseTool::erase(PointerInfo& pointerInfo) {
		TileLayer* activeLayer = dynamic_cast<TileLayer*>(m_DocumentHandler->getActiveDocument()->getLayerHandler()->getActiveLayer());
		int tileIndex = activeLayer->getTileIndex(pointerInfo.curr);

		bool isEven = true;

		if (m_EraserSize % 2 == 1) {
			isEven = false;
		}

		int start = isEven ? -m_EraserSize / 2 : -(m_EraserSize - 1) / 2;
		int end = isEven ? m_EraserSize / 2 : (m_EraserSize - 1) / 2 + 1;

		int centerCol = activeLayer->getColumn(tileIndex);
		int centerRow = activeLayer->getRow(tileIndex);

		for (int i = start; i < end; i++) {
			for (int j = start; j < end; j++) {
				int currentTileIndex = activeLayer->getTileIndex(centerCol + i, centerRow + j);
				Renderable2D* sprite = activeLayer->getAtTileIndex(currentTileIndex);
				if (sprite != nullptr) {
					activeLayer->remove(sprite);
				}
			}
		}
	}

	void EraseTool::activate()
	{
		auto tempLayer = this->m_DocumentHandler->getActiveDocument()->getLayerHandler()->getLayer(DEFAULT_TEMP_LAYER_ID);
		TileLayer* activeLayer = dynamic_cast<TileLayer*>(m_DocumentHandler->getActiveDocument()->getLayerHandler()->getActiveLayer());
	
		float eraserSize = activeLayer->getTileSize() * static_cast<float>(m_EraserSize);

		unsigned int color = 0xff0099ff;

		m_TopLine = new Rect2D(-eraserSize / 2.0f, eraserSize / 2.0f, eraserSize, 0.1f, color);
		m_RightLine = new Rect2D(eraserSize / 2.0f, -eraserSize / 2.0f, 0.1f, eraserSize, color);
		m_BottomLine = new Rect2D(-eraserSize / 2.0f, -eraserSize / 2.0f, eraserSize, 0.1f, color);
		m_LeftLine = new Rect2D(-eraserSize / 2.0f, -eraserSize / 2.0f, 0.1f, eraserSize, color);

		tempLayer->add(m_TopLine);
		tempLayer->add(m_RightLine);
		tempLayer->add(m_BottomLine);
		tempLayer->add(m_LeftLine);
	}

	void EraseTool::deactivate()
	{
		auto tempLayer = this->m_DocumentHandler->getActiveDocument()->getLayerHandler()->getLayer(DEFAULT_TEMP_LAYER_ID);
		tempLayer->clear();
	}
}}