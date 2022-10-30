#pragma once

#include "../../maths/vec3.h"
#include "../../maths/vec2.h"

namespace spright_engine { namespace graphics {
	struct VertexData {
		spright_engine::maths::Vec3 vertex;
		unsigned int color;
		float tid;
		spright_engine::maths::Vec2 uv;
	};
} }