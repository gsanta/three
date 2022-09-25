#include "brush_tool.h"

namespace my_app { namespace editor { namespace tool {

	BrushTool::BrushTool(DocumentHandler* documentHandler, EditorConfig& editorConfig) 
		: m_documentHandler(documentHandler), m_EditorConfig(editorConfig), Tool("brush")
	{

	}

	void BrushTool::pointerDown(PointerInfo& pointerInfo)
	{
		sparky::graphics::TileLayer* tileLayer = m_documentHandler->getActiveDocument()->getActiveTileLayer();
		sparky::maths::Vec2 tilePos = tileLayer->getTilePos(pointerInfo.curr);

		sparky::graphics::Sprite* sprite = new sparky::graphics::Sprite(tilePos.x, tilePos.y, tileLayer->getTileSize(), tileLayer->getTileSize(), 0xff0000ff);
		tileLayer->add(sprite);
	}
}}}
