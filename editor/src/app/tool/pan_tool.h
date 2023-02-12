#pragma once

#include "tool.h"
#include "../../engine/graphics/camera/camera.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "pointer_info.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;

	class PanTool : public Tool
	{
	private:
		Camera* m_Camera;
		float m_ZoomFactor = 1.0f;

	public:
		PanTool(Camera* camera);
	private:
		void pointerMove(PointerInfo& pointerInfo) override;
	};
}}
