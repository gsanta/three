#pragma once

#include "../../engine/graphics/mesh/meshes/rect2d.h"
#include "../../engine/scene/containers/tile_layer.h"
#include "../document/factory/document_factory.h"
#include "./tile_operations.h"
#include "shear_horizontal.h"
#include "shear_vertical.h"

namespace spright
{
namespace editing
{
    using namespace engine;

    std::vector<int> rotate(TileLayer &source, const BoundsInt &bounds, float angle);
} // namespace editing
} // namespace spright
