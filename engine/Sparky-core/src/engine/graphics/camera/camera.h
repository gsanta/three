#pragma once

#include "../../../maths/mat4.h"
#include "../../../maths/vec2.h"
#include "../../../maths/vec3.h"
#include "../../maths/mathFuncs.h"
#include "./ortho_projection_info.h";
#include "../../system/window/window.h"

namespace engine { namespace graphics {
	using namespace ::spright::maths;
	using namespace ::engine::system;

	class Camera {
	private:
		Mat4 m_ProjectionMatrix;
		Mat4 m_View;
		Vec2 m_Center2D;
		float z = 0.5f;
		float m_InitialWidth;
		float m_Zoom = 1.0f;
		OrthoProjectionInfo m_InitialProjectionInfo;
		OrthoProjectionInfo m_ProjectionInfo;
		float aspectRatio;
		Window* m_Window;
	public:
		Camera(Window* window, OrthoProjectionInfo initialProjectionInfo);
		void translate2D(Vec2 pos);
		void translateZ(float val);
		void setProjectionInfo(OrthoProjectionInfo projectionInfo);
		inline const OrthoProjectionInfo& getProjectionInfo() const {
			return m_ProjectionInfo;
		}
		inline Mat4 getProjectionMatrix() {
			return m_ProjectionMatrix;
		}
		inline float getAspectRatio() const {
			return aspectRatio;
		}
		inline Mat4& getView() {
			return m_View;
		}
		inline Vec2 getCenter2D() {
			return m_Center2D;
		}

		Vec2 screenToModel(Vec2 screen);

		// TODO merge this with screenToModel
		Vec2 screenToCameraPos(double x, double y);

		inline float getZoom() {
			return m_Zoom;
		}

	private:
		void updateAspectRatio();
	};
}}

