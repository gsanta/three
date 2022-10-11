#pragma once

#include "../../maths/vec3.h"
#include "../../maths/vec2.h"

namespace my_app_engine { namespace graphics {
	struct VertexData {
		my_app_engine::maths::Vec3 vertex;
		unsigned int color;
		float tid;
		my_app_engine::maths::Vec2 uv;
	};
} }