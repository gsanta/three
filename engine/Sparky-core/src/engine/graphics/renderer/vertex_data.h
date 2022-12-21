#pragma once

#include "../../maths/vec3.h"
#include "../../../maths/vec2.h"

namespace engine { namespace graphics {
	using namespace spright::maths;

	struct VertexData {
		engine::maths::Vec3 vertex;
		unsigned int color;
		float tid;
		Vec2 uv;
	};
} }