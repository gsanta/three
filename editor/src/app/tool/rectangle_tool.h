#pragma once

#include "../../engine/graphics/renderable/rect2d.h"
#include "../../maths/vec2.h"
#include "../../maths/vec3.h"
#include "tool/tool.h"
#include "tool/tool_context.h"

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class RectangleTool : public Tool
    {
    public:
        RectangleTool();

        void pointerDown(const ToolContext &) override;

        void pointerUp(const ToolContext &) override;

        void pointerMove(const ToolContext &) override;

    private:
        float m_Size = 10;

        Rect2D *m_Rect = nullptr;
    };
} // namespace editor
} // namespace spright
