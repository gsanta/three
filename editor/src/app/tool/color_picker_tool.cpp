#include "color_picker_tool.h"

namespace spright { namespace editor {

	ColorPickerTool::ColorPickerTool(DocumentStore* documentStore, Services* services) : m_DocumentStore(documentStore), m_Services(services), Tool("color_picker") {

	}

	void ColorPickerTool::pointerDown(PointerInfo& pointerInfo) {

		TileLayer* tileLayer = dynamic_cast<TileLayer*>(m_DocumentStore->getActiveDocument()->getLayerHandler()->getActiveLayer());
		Camera* camera = m_DocumentStore->getActiveDocument()->getCamera();
		Vec2Int tilePos = tileLayer->getTilePos(pointerInfo.curr);
		int tileIndex = tileLayer->getTileIndex(tilePos.x, tilePos.y);
		Renderable2D* renderable = tileLayer->getAtTileIndex(tileIndex);

		if (renderable != nullptr) {
			m_Services->getColorPalette()->color = renderable->getColor();
		}
	}
}}