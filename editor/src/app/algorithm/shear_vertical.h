#pragma once

#include "../../engine/graphics/layer/tile_view.h"
#include "../tool/tools/select_tool/rect_selector.h"
#include "./tile_operations.h"
#include "shear_utils.h"

#include <cmath>
#include <vector>

namespace spright
{
namespace editor
{
    using namespace engine;

    std::vector<int> shear_vertical(TileLayer &source, const BoundsInt &bounds, float angle);
} // namespace editor
} // namespace spright
