#pragma once

#include "../../../../engine/graphics/mesh/meshes/rect2d.h"
#include "../../../../engine/scene/containers/tile_layer.h"
#include "../../../../maths/vec2.h"
#include "../../../../maths/vec2_int.h"
#include "../../../utils/declarations.h"

namespace spright
{
namespace editing
{
    using namespace spright::engine;
    using namespace ::spright::maths;

    class Brush
    {

    public:
        void paint(TileLayer &tileLayer,
                   const Vec2Int &tilePos,
                   unsigned int color,
                   const onRect2DCreate &operation = defaultRect2DCreate);
    };
} // namespace editing
} // namespace spright
