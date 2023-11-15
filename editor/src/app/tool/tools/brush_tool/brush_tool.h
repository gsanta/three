#pragma once
#include "../../../../engine/graphics/camera/camera2d.h"
#include "../../../../engine/graphics/renderable/rect2d.h"
#include "../../../../engine/graphics/renderable/renderable2d.h"
#include "../../../core/history/document_history.h"
#include "../../../core/history/tile_undo.h"
#include "../../../document/document_store.h"
#include "../../../document/drawing.h"
#include "../../../editor_config.h"
#include "../../context/tool_context.h"
#include "../../cursor/rectangle_cursor/rectangle_cursor.h"
#include "../../tool.h"
#include "brush.h"

#include <vector>

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;
    using namespace spright::maths;

    class BrushTool : public Tool
    {
    private:
        int m_Size = 1;

        Rect2D *sprite;

        Brush brush;

    public:
        BrushTool();

        void setSize(int size);

        void pointerMove(const ToolContext &) override;

        void pointerDown(const ToolContext &) override;

    private:
        void paint(const ToolContext &context, bool isPointerMove);
    };
} // namespace editor
} // namespace spright
