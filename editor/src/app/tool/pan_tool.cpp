#include "pan_tool.h"

namespace spright { namespace editor {
	PanTool::PanTool(DocumentStore* documentStore) : m_DocumentStore(documentStore), Tool("pan")
	{
	}

	void PanTool::pointerMove(PointerInfo& pointerInfo)
	{
		if (pointerInfo.isMiddleButtonDown() == false) {
			return;
		}

		if (pointerInfo.isDown) {
			m_DocumentStore->getActiveDocument().getCamera().translate2D(pointerInfo.prev - pointerInfo.curr);
		}
	}
}}