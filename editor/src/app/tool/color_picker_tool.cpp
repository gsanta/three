#include "color_picker_tool.h"

namespace spright { namespace editor {

	ColorPickerTool::ColorPickerTool(LayerProvider* layerProvider, EventEmitter* eventHandler) : m_LayerProvider(layerProvider), m_EventEmitter(eventHandler), Tool("color_picker") {

	}

	void ColorPickerTool::pointerDown(PointerInfo& pointerInfo) {

		TileLayer& tileLayer = m_LayerProvider->getActiveLayer();
		Vec2Int tilePos = tileLayer.getTilePos(pointerInfo.curr);
		int tileIndex = tileLayer.getTileIndex(tilePos.x, tilePos.y);
		Rect2D* tile = tileLayer.getAtTileIndex(tileIndex);

		if (tile != nullptr) {
			unsigned int color = tile->getColor();

			if (color != m_PickedColor) {
				m_PickedColor = color;
				emitColorChange();
			}
		}
	}

	unsigned int ColorPickerTool::getPickedColor() const
	{
		return m_PickedColor;
	}

	void ColorPickerTool::emitColorChange() const {
		nlohmann::json json = {
			{ "tool", getName() },
		};

		m_EventEmitter->emitChange("tool_data_changed", json);
	}

	std::string ColorPickerTool::getData() {
		nlohmann::json json = { "color", m_PickedColor };

		return json;
	}
}}