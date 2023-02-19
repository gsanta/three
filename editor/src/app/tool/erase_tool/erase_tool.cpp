#include "erase_tool.h"

namespace spright { namespace editor {

	EraseTool::EraseTool(LayerProvider* layerProvider) : m_LayerProvider(layerProvider), Tool("erase")
	{
		m_EraserStroke = EraserStroke(&layerProvider->getTempLayer(), m_Size);
	}

	void EraseTool::pointerDown(PointerInfo& pointerInfo)
	{
		TileLayer& activeLayer = m_LayerProvider->getActiveLayer();
		m_Eraser.erase(activeLayer, activeLayer.getTilePos(pointerInfo.curr), m_Size);
	}

	void EraseTool::pointerMove(PointerInfo& pointerInfo)
	{
		TileLayer& activeLayer = m_LayerProvider->getActiveLayer();

		m_EraserStroke.draw(activeLayer, pointerInfo.curr);

		if (pointerInfo.isDown) {
			m_Eraser.erase(activeLayer, activeLayer.getTilePos(pointerInfo.curr), m_Size);
		}
	}

	void EraseTool::deactivate()
	{
		m_EraserStroke.clear();
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