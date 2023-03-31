#pragma once

#include "../../../maths/mat4.h"
#include "../../../maths/vec2.h"
#include "../../../maths/vec3.h"
#include "../../../maths/mathFuncs.h"
#include "./ortho_projection_info.h"
#include "../../system/window/window.h"
#include "../renderable/bounds.h"

namespace spright { namespace engine {
	using namespace ::spright::maths;

	class Camera {
	private:
		Mat4 m_ProjectionMatrix;
		Mat4 m_View;
		Vec2 m_Translate;
		Bounds m_CameraDim;
		float m_Near;
		float m_Far;
		float z = 0.5f;
		float m_Zoom = 1.0f;
		float m_AspectRatio;

		float m_InitialWidth;
		float m_WindowWidth;
		float m_WindowHeight;
		Bounds m_DocumentBounds;
	public:
		Camera(float windowWidth, float windowHeight, Bounds canvasDimensions, float near, float far);

		void translate2D(Vec2 pos);
		void translateZ(float val);
		void zoom(float newWidth);
		float getZoom();
		const Bounds& getBounds() const;

		Mat4 getProjectionMatrix();
		Mat4& getViewMatrix();
		Vec2 getCenter2D();

		Vec2 screenToModel(Vec2 screen);

		// TODO merge this with screenToModel
		Vec2 screenToCameraPos(double x, double y);

		void updateWindowSize(float windowWidth, float windowHeight);

	private:
		void updateAspectRatio();
		float getAspectRatio() const;
		Bounds getCameraDimensions();
	};
}}

