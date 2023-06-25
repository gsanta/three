#pragma once

#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../../maths/vec2.h"
#include "../../../maths/vec3.h"
#include "../tool/tool.h"
#include "../tool/tool_context.h"
#include "draw_rect.h"
#include "temp_rect_drawer.h"

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

        void setFilled(bool isFilled);

        bool isFilled();

    private:
        float m_Size = 10;

        bool m_IsFilled = false;

        Rect2D *m_Rect = nullptr;

        TempRectDrawer m_TempRectDrawer;
    };
} // namespace editor
} // namespace spright
