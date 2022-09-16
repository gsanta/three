#include "erase_tool.h"

namespace my_app { namespace editor { namespace tool {

	EraseTool::EraseTool(DocumentHandler* documentHandler) : m_DocumentHandler(documentHandler), Tool("erase")
	{

	}

	void EraseTool::pointerDown(PointerInfo& pointerInfo)
	{
	}

	void EraseTool::pointerUp(PointerInfo& pointerInfo)
	{
	}

	void EraseTool::pointerMove(PointerInfo& pointerInfo)
	{
		if (!pointerInfo.isDown) {
			return;
		}

		//m_DocumentHandler->getActiveDocument()->getLayer()->clear();
		for (Sprite* sprite : sprites) {
			delete sprite;
		}

		sprites.clear();

		Sprite* down = new Sprite(pointerInfo.down.x, pointerInfo.down.y, 0.1f, 0.1f, 0xff0000ff);
		Sprite* curr = new Sprite(pointerInfo.curr.x, pointerInfo.curr.y, 0.1f, 0.1f, 0xff0000ff);
		
		sprites.push_back(down);
		sprites.push_back(curr);
	
		this->m_DocumentHandler->getActiveDocument()->getLayer()->add(down);
		this->m_DocumentHandler->getActiveDocument()->getLayer()->add(curr);

	}

}}}