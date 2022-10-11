#include "rectangle_tool.h"

namespace my_app { namespace editor { namespace tool {

	RectangleTool::RectangleTool(DocumentHandler* documentHandler) : m_DocumentHandler(documentHandler), Tool("rectangle") {

	}

	void RectangleTool::pointerDown(PointerInfo& pointerInfo)
	{
		this->m_Rect = new my_app_engine::graphics::Sprite(pointerInfo.curr.x, pointerInfo.curr.y, 0.1f, 0.1f, 0xff0000ff);
		this->m_DocumentHandler->getActiveDocument()->getActiveLayer()->add(m_Rect);
	}

	void RectangleTool::pointerUp(PointerInfo& pointerInfo)
	{
		if (!pointerInfo.isDown) {
			this->m_Rect = new my_app_engine::graphics::Sprite(pointerInfo.curr.x, pointerInfo.curr.y - m_Size, m_Size, m_Size, 0xff0000ff);
			this->m_DocumentHandler->getActiveDocument()->getActiveLayer()->add(m_Rect);
		}
	}

	void RectangleTool::pointerMove(PointerInfo& pointerInfo)
	{
		if (pointerInfo.isDown) {
			float width = pointerInfo.curr.x - pointerInfo.down.x;
			float height = pointerInfo.curr.y - pointerInfo.down.y;
			std::cout << width << std::endl;
			this->m_Rect->setSize(my_app_engine::maths::Vec2(width, height));
		}
	}

}}}