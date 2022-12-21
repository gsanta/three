#include "rectangle_tool.h"

namespace spright { namespace tool {

	RectangleTool::RectangleTool(DocumentHandler* documentHandler, Services* services, EventHandler* eventHandler) : m_DocumentHandler(documentHandler), m_Services(services), m_EventHandler(eventHandler), Tool("rectangle") {

	}

	void RectangleTool::pointerDown(PointerInfo& pointerInfo)
	{
		int color = m_Services->getColorPalette()->color;
		this->m_Rect = new engine::graphics::Sprite(pointerInfo.curr.x, pointerInfo.curr.y, 0.1f, 0.1f, color);
		this->m_DocumentHandler->getActiveDocument()->getActiveLayer()->add(m_Rect);
	}

	void RectangleTool::pointerUp(PointerInfo& pointerInfo)
	{
		if (!pointerInfo.isDown) {
			int color = m_Services->getColorPalette()->color;
			this->m_Rect = new engine::graphics::Sprite(pointerInfo.curr.x, pointerInfo.curr.y - m_Size, m_Size, m_Size, color);
			this->m_DocumentHandler->getActiveDocument()->getActiveLayer()->add(m_Rect);
		
			m_EventHandler->emitDataChange();
		}
	}

	void RectangleTool::pointerMove(PointerInfo& pointerInfo)
	{
		if (pointerInfo.isDown) {

			engine::graphics::TileLayer* tileLayer = dynamic_cast<engine::graphics::TileLayer*>(m_DocumentHandler->getActiveDocument()->getActiveLayer());
			maths::Vec2 downTilePos = tileLayer->getBottomLeftPos(pointerInfo.down);
			maths::Vec2 currTilePos = tileLayer->getBottomLeftPos(pointerInfo.curr);

			float left = downTilePos.x < currTilePos.x ? downTilePos.x : currTilePos.x;
			float right = downTilePos.x > currTilePos.x ? downTilePos.x : currTilePos.x;
			float bottom = downTilePos.y < currTilePos.y ? downTilePos.y : currTilePos.y;
			float top = downTilePos.y > currTilePos.y ? downTilePos.y : currTilePos.y;



			float width = pointerInfo.curr.x - pointerInfo.down.x;
			float height = pointerInfo.curr.y - pointerInfo.down.y;
			std::cout << width << std::endl;
			this->m_Rect->setPosition(maths::Vec2(left, bottom));
			this->m_Rect->setSize(maths::Vec2(right - left, top - bottom));
		}
	}
}}