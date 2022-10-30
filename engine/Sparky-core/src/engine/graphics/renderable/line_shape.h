#pragma once

#include "renderable2d.h"
#include "../renderer/renderer2d.h"
#include "../../maths/vec3.h"

namespace spright_engine { namespace graphics {

	class LineShape : public spright_engine::graphics::Renderable2D {
	private:
		spright_engine::maths::Vec2 m_Start;
		spright_engine::maths::Vec2 m_End;
		float m_Thickness;
		float m_Length;
		spright_engine::maths::Vec2 m_Dir;
		spright_engine::maths::Vec2 m_Normal;
		spright_engine::maths::Vec3 m_Coords[4];
	public:
		LineShape(float x1, float y1, float x2, float y2, float thickness, unsigned int color);

		virtual void submit(spright_engine::graphics::Renderer2D* renderer) const override;
	};

}}