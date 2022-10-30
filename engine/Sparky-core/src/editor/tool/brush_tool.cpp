#include "brush_tool.h"

namespace my_app
{
	namespace editor
	{
		namespace tool
		{

			BrushTool::BrushTool(DocumentHandler *documentHandler, EditorConfig &editorConfig, my_app_editor::EditorServices* services)
					: m_documentHandler(documentHandler), m_EditorConfig(editorConfig), m_Services(services), Tool("brush")
			{
			}

			void BrushTool::pointerDown(PointerInfo &pointerInfo)
			{
				my_app_engine::graphics::TileLayer *tileLayer = dynamic_cast<my_app_engine::graphics::TileLayer *>(m_documentHandler->getActiveDocument()->getActiveLayer());
				my_app_engine::maths::Vec2 tilePos = tileLayer->getTilePos(pointerInfo.curr);

				int color = m_Services->getColorPalette()->color;
				my_app_engine::graphics::Sprite *sprite = new my_app_engine::graphics::Sprite(tilePos.x, tilePos.y, tileLayer->getTileSize(), tileLayer->getTileSize(), color);
				tileLayer->add(sprite);
			}
		}
	}
}
