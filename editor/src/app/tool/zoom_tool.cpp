#include "zoom_tool.h"

namespace spright { namespace editor {
	ZoomTool::ZoomTool(DocumentStore* documentStore) : m_DocumentStore(documentStore), Tool("zoom")
	{
	}

	void ZoomTool::scroll(PointerInfo& pointerInfo)
	{
		m_DocumentStore->getActiveDocument().getCamera().zoom(pointerInfo.scroll.y > 0 ? -m_ZoomFactor : m_ZoomFactor);
	}
}}