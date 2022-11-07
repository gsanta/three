#include "pan_tool.h"

namespace spright_app {
	PanTool::PanTool(spright_engine::graphics::Camera* camera): m_Camera(camera), Tool("pan")
	{
	}

	void PanTool::pointerMove(tool::PointerInfo& pointerInfo)
	{
		if (pointerInfo.isDown) {
			m_Camera->translate2D(pointerInfo.prev - pointerInfo.curr);
		}
	}
	void PanTool::scroll(tool::PointerInfo& pointerInfo)
	{
		const spright_engine::graphics::OrthoProjectionInfo& projInfo = m_Camera->getProjectionInfo();

		float horizontal = m_ZoomFactor;
		float vertical = horizontal / m_Camera->getAspectRatio();

		if (pointerInfo.scroll.y > 0) {
			horizontal *= -1;
			vertical *= -1;
		}

		const spright_engine::graphics::OrthoProjectionInfo newProjInfo(projInfo.left - horizontal, projInfo.right + horizontal, projInfo.bottom - vertical, projInfo.top + vertical);

		m_Camera->setProjectionInfo(newProjInfo);
	}
}