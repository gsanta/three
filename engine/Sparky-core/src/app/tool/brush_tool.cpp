#include "brush_tool.h"

namespace spright_app { namespace tool {

	BrushTool::BrushTool(DocumentHandler *documentHandler, EditorConfig &editorConfig, spright_app::Services* services, EventHandler* eventHandler)
			: m_documentHandler(documentHandler), m_EditorConfig(editorConfig), m_Services(services), m_EventHandler(eventHandler), Tool("brush")
	{
	}

	void BrushTool::pointerDown(PointerInfo &pointerInfo)
	{
		spright_engine::graphics::TileLayer *tileLayer = dynamic_cast<spright_engine::graphics::TileLayer *>(m_documentHandler->getActiveDocument()->getActiveLayer());
		spright_engine::maths::Vec2 tilePos = tileLayer->getTilePos(pointerInfo.curr);

		int color = m_Services->getColorPalette()->color;
		spright_engine::graphics::Sprite *sprite = new spright_engine::graphics::Sprite(tilePos.x, tilePos.y, tileLayer->getTileSize(), tileLayer->getTileSize(), color);
		tileLayer->add(sprite);

		m_EventHandler->emitDataChange();
	}
}}
