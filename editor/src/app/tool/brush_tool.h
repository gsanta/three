#pragma once
#include "../../engine/graphics/renderable/rect2d.h"
#include "../../engine/graphics/renderable/renderable2d.h"
#include "../core/history/document_history.h"
#include "../core/history/tile_undo.h"
#include "../document/document_store.h"
#include "../document/drawing.h"
#include "../editor_config.h"
#include "brush.h"
#include "colorable.h"
#include "tool/tool.h"
#include "tool/tool_context.h"

#include <vector>

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;
    using namespace spright::maths;

    class BrushTool : public Tool, public Colorable
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
