#pragma once

#include "../../engine/scene/canvas/tile_canvas.h"
#include "../../engine/scene/containers/tile_layer.h"
#include "../tool/tools/select_tool/selection_buffer.h"

namespace spright
{
namespace editing
{
    using namespace engine;

    void flip_horizontal(TileLayer &layer);

    void flip_horizontal(TileLayer &layer, const SelectionBuffer &selectionBuffer);

    void flip_horizontal(std::vector<TileLayer> &layers);

    void flip_horizontal(std::vector<TileLayer> &layers, const SelectionBuffer &selectionBuffer);
} // namespace editing
} // namespace spright
