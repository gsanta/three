#pragma once

#include "../../maths/mat4.h"
#include "../../maths/vec2.h"
#include "../../maths/vec3.h"
#include "../../maths/mathFuncs.h"
#include "./ortho_projection_info.h";

namespace spright_engine { namespace graphics {

	class Camera {
	private:
		spright_engine::maths::Mat4 m_ProjectionMatrix;
		spright_engine::maths::Mat4 m_View;
		spright_engine::maths::Vec2 m_Center2D;
		float z = 0.5f;
		float m_InitialWidth;
		float m_Zoom = 1.0f;
		OrthoProjectionInfo m_ProjectionInfo;
		float aspectRatio;
	public:
		Camera();
		void translate2D(spright_engine::maths::Vec2 pos);
		void translateZ(float val);
		void setProjectionInfo(OrthoProjectionInfo projectionInfo);
		inline const OrthoProjectionInfo& getProjectionInfo() const {
			return m_ProjectionInfo;
		}
		inline spright_engine::maths::Mat4 getProjectionMatrix() {
			return m_ProjectionMatrix;
		}
		inline float getAspectRatio() const {
			return aspectRatio;
		}
		inline spright_engine::maths::Mat4& getView() {
			return m_View;
		}
		inline spright_engine::maths::Vec2 getCenter2D() {
			return m_Center2D;
		}

		inline float getZoom() {
			return m_Zoom;
		}

	private:
		void updateAspectRatio();
	};
}}
