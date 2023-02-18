#include "erase_tool.h"

namespace spright { namespace editor {

	EraseTool::EraseTool(LayerProvider* layerProvider) : m_LayerProvider(layerProvider), Tool("erase")
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
		TileLayer& activeLayer = m_LayerProvider->getActiveLayer();

		float halfEraserSize = activeLayer.getTileSize() * static_cast<float>(m_Size) / 2.0f;

		int tileIndex = activeLayer.getTileIndex(pointerInfo.curr);
		Vec2 pos = activeLayer.getCenterPos(tileIndex);

		m_TopLine->setCenterPosition(pos + Vec2(0, halfEraserSize));
		m_RightLine->setCenterPosition(pos + Vec2(halfEraserSize, 0));
		m_BottomLine->setCenterPosition(pos + Vec2(0, -halfEraserSize));
		m_LeftLine->setCenterPosition(pos + Vec2(-halfEraserSize, 0));
	}

	void EraseTool::erase(PointerInfo& pointerInfo) {
		TileLayer& activeLayer = m_LayerProvider->getActiveLayer();
		m_Eraser.erase(activeLayer, activeLayer.getTilePos(pointerInfo.curr), m_Size);
	}

	void EraseTool::activate()
	{
		TileLayer& tempLayer = m_LayerProvider->getTempLayer();
		TileLayer& activeLayer = m_LayerProvider->getActiveLayer();
	
		float eraserSize = activeLayer.getTileSize() * static_cast<float>(m_Size);

		unsigned int color = 0xff0099ff;

		m_TopLine = new Rect2D(-eraserSize / 2.0f, eraserSize / 2.0f, eraserSize, 0.1f, color);
		m_RightLine = new Rect2D(eraserSize / 2.0f, -eraserSize / 2.0f, 0.1f, eraserSize, color);
		m_BottomLine = new Rect2D(-eraserSize / 2.0f, -eraserSize / 2.0f, eraserSize, 0.1f, color);
		m_LeftLine = new Rect2D(-eraserSize / 2.0f, -eraserSize / 2.0f, 0.1f, eraserSize, color);

		tempLayer.add(m_TopLine);
		tempLayer.add(m_RightLine);
		tempLayer.add(m_BottomLine);
		tempLayer.add(m_LeftLine);
	}

	void EraseTool::deactivate()
	{
		TileLayer& tempLayer = m_LayerProvider->getTempLayer();
		tempLayer.clear();
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