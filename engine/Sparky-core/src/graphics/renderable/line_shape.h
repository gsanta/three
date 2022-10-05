#pragma once

#include "../renderable2d.h"
#include "../renderer2d.h"
#include "../../maths/vec3.h"

namespace my_app_engine { namespace graphics {

	class LineShape : public my_app::graphics::Renderable2D {
	private:
		my_app::maths::Vec2 m_Start;
		my_app::maths::Vec2 m_End;
		float m_Thickness;
		float m_Length;
		my_app::maths::Vec2 m_Dir;
		my_app::maths::Vec2 m_Normal;
		my_app::maths::Vec3 m_Coords[4];
	public:
		LineShape(float x1, float y1, float x2, float y2, float thickness, unsigned int color);

		virtual void submit(my_app::graphics::Renderer2D* renderer) const override;
	};

}}