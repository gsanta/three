#pragma once

#include "../../maths/vec3.h"
#include "../../maths/vec2.h"

namespace engine { namespace graphics {
	struct VertexData {
		engine::maths::Vec3 vertex;
		unsigned int color;
		float tid;
		engine::maths::Vec2 uv;
	};
} }