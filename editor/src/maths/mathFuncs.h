#pragma once

#define _USE_MATH_DEFINES
#include <math.h>
#include "mat4.h"
#include "vec3.h"

namespace spright { namespace maths {

	float toRadians(float degrees);

	Vec3 linePlaneIntersection(Vec3 la, Vec3 lb, Vec3 p0, Vec3 p1, Vec3 p2);
} }