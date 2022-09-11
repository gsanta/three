#include "brush_tool.h"

namespace my_app { namespace editor { namespace tool {

	using namespace sparky;
	using namespace graphics;

	BrushTool::BrushTool(DocumentHandler* documentHandler, EditorConfig& editorConfig) 
		: m_documentHandler(documentHandler), m_EditorConfig(editorConfig), Tool("brush_tool")
	{

	}

	void BrushTool::pointerDown(PointerInfo& pointerInfo)
	{
		Sprite* sprite = new Sprite(pointerInfo.curr.x, pointerInfo.curr.y, m_EditorConfig.pixelSize, m_EditorConfig.pixelSize, 0xff0000ff);
		m_documentHandler->getActiveDocument()->getLayer()->add(sprite);
	}
}}}
