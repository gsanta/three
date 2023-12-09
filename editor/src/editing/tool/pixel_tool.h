#pragma once

#include "../../engine/scene/canvas/tile_canvas.h"
#include "tool.h"

namespace spright
{
namespace editing
{
    using namespace engine;

    class PixelTool : public Tool
    {
    public:
        PixelTool(string name, std::shared_ptr<Cursor> cursor);

        PixelTool(string name);

        void execActivate(Canvas *canvas) override;

    protected:
        TileCanvas *m_Canvas = nullptr;
    };
} // namespace editing
} // namespace spright
