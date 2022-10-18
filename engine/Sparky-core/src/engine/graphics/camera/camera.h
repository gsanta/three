#pragma once

#include "../../maths/mat4.h"
#include "../../maths/vec2.h"
#include "../../maths/vec3.h"
#include "../../maths/mathFuncs.h"

namespace my_app_engine { namespace graphics {

	class Camera {
	private:
		my_app_engine::maths::Mat4 m_View;
		my_app_engine::maths::Vec2 m_Center2D;
	public:
		Camera();
		void translate2D(my_app_engine::maths::Vec2 pos);

		inline my_app_engine::maths::Mat4& getView() {
			return m_View;
		}
	};
}}

