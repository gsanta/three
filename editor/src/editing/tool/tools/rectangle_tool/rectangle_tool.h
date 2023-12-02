#pragma once

#include "../../../../engine/graphics/mesh/meshes/rect2d.h"
#include "../../../../maths/vec2.h"
#include "../../../../maths/vec3.h"
#include "../../../algorithms/draw_rect.h"
#include "../../../history/document_history.h"
#include "../../../history/tile_undo.h"
#include "../../context/tool_context.h"
#include "../../cursor/rectangle_cursor/rectangle_cursor.h"
#include "../../tool.h"
#include "temp_rect_drawer.h"

namespace spright
{
namespace editing
{
    using namespace ::spright::engine;

    class RectangleTool : public Tool
    {
    public:
        RectangleTool();

        void pointerDown(const ToolContext &) override;

        void pointerUp(ToolContext &) override;

        void pointerMove(const ToolContext &) override;

        void setFilled(bool isFilled);

        bool isFilled();

    private:
        float m_Size = 10;

        bool m_IsFilled = false;

        Rect2D *m_Rect = nullptr;

        TempRectDrawer m_TempRectDrawer;
    };
} // namespace editing
} // namespace spright
