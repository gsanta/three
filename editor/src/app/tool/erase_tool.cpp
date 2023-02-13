#include "erase_tool.h"

namespace spright { namespace editor {

	EraseTool::EraseTool(DocumentStore* documentStore) : m_DocumentStore(documentStore), Tool("erase")
	{

	}

	void EraseTool::pointerDown(PointerInfo& pointerInfo)
	{
		erase(pointerInfo);
	}

	void EraseTool::pointerMove(PointerInfo& pointerInfo)
	{
		setEraserPosition(pointerInfo);

		if (pointerInfo.isDown) {
			erase(pointerInfo);
		}
	}

	void EraseTool::setEraserPosition(PointerInfo& pointerInfo) {
		TileLayer* activeLayer = dynamic_cast<TileLayer*>(m_DocumentStore->getActiveDocument()->getLayerHandler()->getActiveLayer());

		float halfEraserSize = activeLayer->getTileSize() * static_cast<float>(m_Size) / 2.0f;

		int tileIndex = activeLayer->getTileIndex(pointerInfo.curr);
		Vec2 pos = activeLayer->getCenterPos(tileIndex);

		m_TopLine->setCenterPosition(pos + Vec2(0, halfEraserSize));
		m_RightLine->setCenterPosition(pos + Vec2(halfEraserSize, 0));
		m_BottomLine->setCenterPosition(pos + Vec2(0, -halfEraserSize));
		m_LeftLine->setCenterPosition(pos + Vec2(-halfEraserSize, 0));
	}

	void EraseTool::erase(PointerInfo& pointerInfo) {
		TileLayer* activeLayer = dynamic_cast<TileLayer*>(m_DocumentStore->getActiveDocument()->getLayerHandler()->getActiveLayer());
		int tileIndex = activeLayer->getTileIndex(pointerInfo.curr);

		bool isEven = true;

		if (m_Size % 2 == 1) {
			isEven = false;
		}

		int start = isEven ? -m_Size / 2 : -(m_Size - 1) / 2;
		int end = isEven ? m_Size / 2 : (m_Size - 1) / 2 + 1;

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
		auto tempLayer = this->m_DocumentStore->getActiveDocument()->getLayerHandler()->getLayer(DEFAULT_TEMP_LAYER_ID);
		TileLayer* activeLayer = dynamic_cast<TileLayer*>(m_DocumentStore->getActiveDocument()->getLayerHandler()->getActiveLayer());
	
		float eraserSize = activeLayer->getTileSize() * static_cast<float>(m_Size);

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
		auto tempLayer = this->m_DocumentStore->getActiveDocument()->getLayerHandler()->getLayer(DEFAULT_TEMP_LAYER_ID);
		tempLayer->clear();
	}
	void EraseTool::setOptions(std::string json)
	{
		nlohmann::json parsedJson = nlohmann::json::parse(json);

		m_Size = parsedJson["size"];
	}

	std::string EraseTool::getOptions()
	{
		nlohmann::json json;

		json["size"] = m_Size;

		return json.dump();
	}
}}