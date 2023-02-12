#include "zoom_tool.h"

namespace spright { namespace editor {
	ZoomTool::ZoomTool(Camera* camera) : m_Camera(camera), Tool("zoom")
	{
	}

	void ZoomTool::scroll(PointerInfo& pointerInfo)
	{
		m_Camera->zoom(pointerInfo.scroll.y > 0 ? -m_ZoomFactor : m_ZoomFactor);
	}
}}