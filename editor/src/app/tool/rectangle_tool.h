#pragma once

#include "../../engine/graphics/renderable/rect2d.h"
#include "../../maths/vec2.h"
#include "../../maths/vec3.h"
#include "../service/services.h"
#include "tool/tool.h"
#include "tool/tool_context.h"

namespace spright
{
namespace editor
{

    using namespace ::spright::engine;

    class RectangleTool : public Tool
    {
    private:
        Services *m_Services;
        float m_Size = 10;
        Rect2D *m_Rect = nullptr;

    public:
        RectangleTool(Services *services);
        void pointerDown(const ToolContext &) override;
        void pointerUp(const ToolContext &) override;
        void pointerMove(const ToolContext &) override;
    };
} // namespace editor
} // namespace spright
