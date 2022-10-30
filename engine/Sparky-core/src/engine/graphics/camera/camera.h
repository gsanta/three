#pragma once

#include "../../maths/mat4.h"
#include "../../maths/vec2.h"
#include "../../maths/vec3.h"
#include "../../maths/mathFuncs.h"

namespace spright_engine { namespace graphics {

	class Camera {
	private:
		spright_engine::maths::Mat4 m_View;
		spright_engine::maths::Vec2 m_Center2D;
	public:
		Camera();
		void translate2D(spright_engine::maths::Vec2 pos);

		inline spright_engine::maths::Mat4& getView() {
			return m_View;
		}
	};
}}

