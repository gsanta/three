#include "brush_tool.h"

namespace my_app { namespace editor { namespace tool {

	using namespace sparky;
	using namespace graphics;

	BrushTool::BrushTool(DocumentHandler* documentHandler) 
		: m_documentHandler(documentHandler), Tool("brush_tool")
	{

	}

	void BrushTool::pointerDown()
	{
		Sprite* sprite = new Sprite(0, 0, 0.9f, 0.9f, 0xff0000ff);
		m_documentHandler->getActiveDocument()->getLayer()->add(sprite);
	}
}}}
