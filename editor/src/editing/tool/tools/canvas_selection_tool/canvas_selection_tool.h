#pragma once
#include "../../../../engine/graphics/colors.h"
#include "../../../../engine/graphics/mesh/meshes/rect2d.h"
#include "../../../../engine/scene/canvas/tile_canvas.h"
#include "../../context/tool_context.h"
#include "../../tool.h"

namespace spright
{
namespace editing
{
    class CanvasSelectionTool : public Tool
    {
    public:
        CanvasSelectionTool();

        void pointerDown(const ToolContext &) override;
    };
} // namespace editing
} // namespace spright
