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
    };
} // namespace maths
} // namespace spright
