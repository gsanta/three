#pragma once

#include "../../engine/scene/canvas/canvas3d.h"
#include "../../engine/scene/canvas/tile_canvas.h"
#include "../document/document.h"

namespace spright
{
namespace editing
{
    TileCanvas &get_active_tile_canvas(Document &document);

    TileCanvas &get_tile_canvas_at(Document &document, int index);

    Canvas3d &get_active_3d_canvas(Document &document);
} // namespace editing
} // namespace spright
