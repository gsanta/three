#include "brush_tool.h"

namespace my_app
{
	namespace editor
	{
		namespace tool
		{

			BrushTool::BrushTool(DocumentHandler *documentHandler, EditorConfig &editorConfig, EditorState& editorState)
					: m_documentHandler(documentHandler), m_EditorConfig(editorConfig), m_editorState(editorState), Tool("brush")
			{
			}

			void BrushTool::pointerDown(PointerInfo &pointerInfo)
			{
				my_app_engine::graphics::TileLayer *tileLayer = dynamic_cast<my_app_engine::graphics::TileLayer *>(m_documentHandler->getActiveDocument()->getActiveLayer());
				my_app_engine::maths::Vec2 tilePos = tileLayer->getTilePos(pointerInfo.curr);

				my_app_engine::graphics::Sprite *sprite = new my_app_engine::graphics::Sprite(tilePos.x, tilePos.y, tileLayer->getTileSize(), tileLayer->getTileSize(), this->m_editorState.color);
				tileLayer->add(sprite);
			}
		}
	}
}
