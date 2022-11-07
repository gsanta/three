#pragma once

#include "tool.h"
#include "../../engine/graphics/camera/camera.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "pointer_info.h"

namespace spright_app {

	class ZoomTool : public tool::Tool
	{
	private:
		spright_engine::graphics::Camera* m_Camera;
		float m_ZoomFactor = 1.0f;

	public:
		ZoomTool(spright_engine::graphics::Camera* camera);
	private:
		void scroll(tool::PointerInfo& pointerInfo) override;
	};
}
