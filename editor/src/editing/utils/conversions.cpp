#include "conversions.h"

namespace spright
{
namespace editing
{
    TileCanvas &get_active_tile_canvas(Document &document)
    {
        return dynamic_cast<TileCanvas &>(*document.getActiveCanvas());
    }

    TileCanvas &get_tile_canvas_at(Document &document, int index)
    {
        return dynamic_cast<TileCanvas &>(*document.getCanvas(index));
    }

    Canvas3d &get_active_3d_canvas(Document &document)
    {
        return dynamic_cast<Canvas3d &>(*document.getActiveCanvas());
    }

} // namespace editing
} // namespace spright
