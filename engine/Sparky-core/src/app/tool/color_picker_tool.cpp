#include "color_picker_tool.h"

namespace spright_app {

	ColorPickerTool::ColorPickerTool(DocumentHandler* documentHandler, Services* services): m_DocumentHandler(documentHandler), m_Services(services), Tool("color_picker") {

	}

	void ColorPickerTool::pointerDown(PointerInfo& pointerInfo) {

		TileLayer* tileLayer = dynamic_cast<TileLayer*>(m_DocumentHandler->getActiveDocument()->getActiveLayer());
		Camera* camera = m_DocumentHandler->getActiveDocument()->getCamera();
		Vec2 model = camera->screenToModel(pointerInfo.curr);

		Vec2Int tilePos = tileLayer->getTilePos(model);
		int tileIndex = tileLayer->getTileIndex(tilePos.x, tilePos.y);
		Renderable2D* renderable = tileLayer->getAtTileIndex(tileIndex);

		if (renderable != nullptr) {
			m_Services->getColorPalette()->color = renderable->getColor();
		}
	}
}