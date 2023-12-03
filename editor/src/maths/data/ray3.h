#pragma once

#include "../vec3.h"

namespace spright
{
namespace maths
{
    struct Ray3
    {
        Vec3 origin;

        Vec3 direction;

        Ray3(const Vec3 &origin, const Vec3 &direction);

        static Ray3 fromTwoPoints(const Vec3 &origin, const Vec3 &pointOnRay);
    };
} // namespace maths
} // namespace spright
