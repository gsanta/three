#pragma once

#include "../../../maths/vec3.h"
#include "../../../maths/vec2.h"

namespace spright { namespace engine {
	using namespace spright::maths;

	struct VertexData {
		Vec3 vertex;
		unsigned int color;
		float tid;
		Vec2 uv;
	};
} }