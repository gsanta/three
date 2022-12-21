#include "zoom_tool.h"

namespace spright {
	ZoomTool::ZoomTool(engine::graphics::Camera* camera) : m_Camera(camera), Tool("zoom")
	{
	}

	void ZoomTool::scroll(tool::PointerInfo& pointerInfo)
	{
		const engine::graphics::OrthoProjectionInfo& projInfo = m_Camera->getProjectionInfo();

		float horizontal = m_ZoomFactor;
		float vertical = horizontal / m_Camera->getAspectRatio();

		if (pointerInfo.scroll.y > 0) {
			horizontal *= -1;
			vertical *= -1;
		}

		const engine::graphics::OrthoProjectionInfo newProjInfo(projInfo.left - horizontal, projInfo.right + horizontal, projInfo.bottom - vertical, projInfo.top + vertical);

		m_Camera->setProjectionInfo(newProjInfo);
	}
}