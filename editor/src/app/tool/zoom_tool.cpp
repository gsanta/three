#include "zoom_tool.h"

namespace spright {
	ZoomTool::ZoomTool(engine::graphics::Camera* camera) : m_Camera(camera), Tool("zoom")
	{
	}

	void ZoomTool::scroll(tool::PointerInfo& pointerInfo)
	{
		m_Camera->zoom(pointerInfo.scroll.y > 0 ? -m_ZoomFactor : m_ZoomFactor);
	}
}