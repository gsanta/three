#pragma once

#include "../../maths/vec3.h"
#include "../../maths/vec2.h"

namespace sparky { namespace graphics {
	struct VertexData {
		maths::Vec3 vertex;
		unsigned int color;
		float tid;
		maths::Vec2 uv;
	};
} }