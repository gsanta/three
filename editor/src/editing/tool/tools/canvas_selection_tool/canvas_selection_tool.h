#pragma once
#include "../../../../engine/graphics/colors.h"
#include "../../../../engine/graphics/mesh/meshes/rect2d.h"
#include "../../../../engine/scene/canvas/tile_canvas.h"
#include "../../context/tool_context.h"
#include "../../pixel_tool.h"

namespace spright
{
namespace editing
{
    class CanvasSelectionTool : public PixelTool
    {
    public:
        CanvasSelectionTool();

        void pointerDown(const ToolContext &) override;
    };
} // namespace editing
} // namespace spright
