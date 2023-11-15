#pragma once
#include "../../../../engine/graphics/colors.h"
#include "../../../../engine/graphics/renderable/rect2d.h"
#include "../../../document/drawing.h"
#include "../../context/tool_context.h"
#include "../../tool.h"

namespace spright
{
namespace editor
{
    class CanvasSelectionTool : public Tool
    {
    public:
        CanvasSelectionTool();

        void pointerDown(const ToolContext &) override;
    };
} // namespace editor
} // namespace spright
