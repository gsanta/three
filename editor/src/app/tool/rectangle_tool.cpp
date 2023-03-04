#include "rectangle_tool.h"

namespace spright { namespace editor {

	RectangleTool::RectangleTool(DocumentStore* documentStore, Services* services) : m_DocumentStore(documentStore), m_Services(services), Tool("rectangle") {

	}

	void RectangleTool::pointerDown(PointerInfo& pointerInfo)
	{
		int color = m_Services->getColorPalette()->color;
		m_Rect = &m_DocumentStore->getActiveDocument()->getLayerHandler()->getActiveLayer()->add(Rect2D(pointerInfo.curr.x, pointerInfo.curr.y, 0.1f, 0.1f, color));
	}

	void RectangleTool::pointerUp(PointerInfo& pointerInfo)
	{
		if (!pointerInfo.isDown) {
			int color = m_Services->getColorPalette()->color;
			m_Rect = &m_DocumentStore->getActiveDocument()->getLayerHandler()->getActiveLayer()->add(Rect2D(pointerInfo.curr.x, pointerInfo.curr.y - m_Size, m_Size, m_Size, color));
		
		}
	}

	void RectangleTool::pointerMove(PointerInfo& pointerInfo)
	{
		if (pointerInfo.isDown) {

			TileLayer* tileLayer = dynamic_cast<TileLayer*>(m_DocumentStore->getActiveDocument()->getLayerHandler()->getActiveLayer());
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