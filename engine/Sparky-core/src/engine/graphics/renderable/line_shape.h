#pragma once

#include "renderable2d.h"
#include "../renderer/renderer2d.h"
#include "../../maths/vec3.h"

namespace my_app_engine { namespace graphics {

	class LineShape : public my_app_engine::graphics::Renderable2D {
	private:
		my_app_engine::maths::Vec2 m_Start;
		my_app_engine::maths::Vec2 m_End;
		float m_Thickness;
		float m_Length;
		my_app_engine::maths::Vec2 m_Dir;
		my_app_engine::maths::Vec2 m_Normal;
		my_app_engine::maths::Vec3 m_Coords[4];
	public:
		LineShape(float x1, float y1, float x2, float y2, float thickness, unsigned int color);

		virtual void submit(my_app_engine::graphics::Renderer2D* renderer) const override;
	};

}}