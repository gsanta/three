#pragma once

#define _USE_MATH_DEFINES
#include <math.h>
#include "../../maths/mat4.h"
#include "../../maths/vec3.h"

namespace engine { namespace maths {
	using namespace spright::maths;

	float toRadians(float degrees);

	Vec3 linePlaneIntersection(Vec3 la, Vec3 lb, Vec3 p0, Vec3 p1, Vec3 p2);
} }