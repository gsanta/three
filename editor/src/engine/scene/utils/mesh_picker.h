#pragma once

#include "../../../maths/data/ray3.h"
#include "../../../maths/vec2.h"
#include "../../../maths/vec3.h"
#include "../canvas/canvas3d.h"
#include "picked_mesh_info.h"

namespace spright
{
namespace engine
{
    class MeshPicker
    {
    public:
        PickedMeshInfo pickWithScreenPos(Canvas3d drawing, Vec2 screenPos);
    };
} // namespace engine
} // namespace spright
