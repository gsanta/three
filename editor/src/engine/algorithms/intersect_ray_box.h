#pragma once

#include "../../maths/data/ray3.h"
#include "../graphics/mesh/meshes/box.h"

namespace spright
{
namespace engine
{
    bool intersect_ray_box(const Box &box, const Ray3 &ray);
}
} // namespace spright
