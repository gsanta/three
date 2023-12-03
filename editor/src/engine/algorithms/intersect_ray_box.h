#pragma once

#include "../../maths/data/bounds3.h"
#include "../../maths/data/ray3.h"
#include "../../maths/vec3.h"

namespace spright
{
namespace engine
{
    using namespace maths;

    bool intersect_ray_box(const Bounds3 &bounds, const Ray3 &ray, Vec3 &hitPoint);
} // namespace engine
} // namespace spright
