#include "eraser_tool.h"

namespace spright { namespace editor {

	EraserTool::EraserTool(LayerProvider* layerProvider, int eraserSize) : m_LayerProvider(layerProvider), m_EraserSize(eraserSize), Tool("erase")
	{
		m_EraserStroke = EraserStroke(&layerProvider->getTempLayer(), m_EraserSize);
	}

	void EraserTool::pointerDown(PointerInfo& pointerInfo)
	{
		TileLayer& activeLayer = m_LayerProvider->getActiveLayer();
		m_Eraser.erase(activeLayer, activeLayer.getTilePos(pointerInfo.curr), m_EraserSize);
	}

	void EraserTool::pointerMove(PointerInfo& pointerInfo)
	{
		TileLayer& activeLayer = m_LayerProvider->getActiveLayer();

		m_EraserStroke.draw(activeLayer, pointerInfo.curr);

		if (pointerInfo.isDown) {
			m_Eraser.erase(activeLayer, activeLayer.getTilePos(pointerInfo.curr), m_EraserSize);
		}
	}

	void EraserTool::deactivate()
	{
		m_EraserStroke.clear();
	}
	void EraserTool::setOptions(std::string json)
	{
		nlohmann::json parsedJson = nlohmann::json::parse(json);

		m_EraserSize = parsedJson["size"];
	}

	std::string EraserTool::getOptions()
	{
		nlohmann::json json;

		json["size"] = m_EraserSize;

		return json.dump();
	}
}}