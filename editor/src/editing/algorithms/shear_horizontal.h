#pragma once

#include "../../engine/scene/containers/tile_layer.h"
#include "../../engine/scene/containers/tile_view.h"
#include "./tile_operations.h"
#include "shear_utils.h"

#include <cmath>

namespace spright
{
namespace editing
{
    using namespace engine;

    std::vector<int> shear_horizontal(TileLayer &source, const BoundsInt &bounds, float angle);
} // namespace editing
} // namespace spright
