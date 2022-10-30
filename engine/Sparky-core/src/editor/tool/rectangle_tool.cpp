#include "rectangle_tool.h"

namespace my_app_editor { namespace tool {

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

			my_app_engine::graphics::TileLayer* tileLayer = dynamic_cast<my_app_engine::graphics::TileLayer*>(m_DocumentHandler->getActiveDocument()->getActiveLayer());
			my_app_engine::maths::Vec2 downTilePos = tileLayer->getTilePos(pointerInfo.down);
			my_app_engine::maths::Vec2 currTilePos = tileLayer->getTilePos(pointerInfo.curr);

			float left = downTilePos.x < currTilePos.x ? downTilePos.x : currTilePos.x;
			float right = downTilePos.x > currTilePos.x ? downTilePos.x : currTilePos.x;
			float bottom = downTilePos.y < currTilePos.y ? downTilePos.y : currTilePos.y;
			float top = downTilePos.y > currTilePos.y ? downTilePos.y : currTilePos.y;



			float width = pointerInfo.curr.x - pointerInfo.down.x;
			float height = pointerInfo.curr.y - pointerInfo.down.y;
			std::cout << width << std::endl;
			this->m_Rect->setPosition(my_app_engine::maths::Vec3(left, bottom, 0));
			this->m_Rect->setSize(my_app_engine::maths::Vec2(right - left, top - bottom));
		}
	}
}}