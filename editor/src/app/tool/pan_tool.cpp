#include "pan_tool.h"

namespace spright {
	PanTool::PanTool(engine::graphics::Camera* camera): m_Camera(camera), Tool("pan")
	{
	}

	void PanTool::pointerMove(tool::PointerInfo& pointerInfo)
	{
		if (pointerInfo.isMiddleButtonDown() == false) {
			return;
		}

		if (pointerInfo.isDown) {
			m_Camera->translate2D(pointerInfo.prev - pointerInfo.curr);
		}
	}
}