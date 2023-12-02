#pragma once
#include "../../../../engine/graphics/mesh/meshes/rect2d.h"
#include "../../../../engine/graphics/mesh/meshes/renderable2d.h"
#include "../../../../engine/scene/cameras/camera2d.h"
#include "../../../../engine/scene/canvas/tile_canvas.h"
#include "../../../document/document_store.h"
#include "../../../history/document_history.h"
#include "../../../history/tile_undo.h"
#include "../../context/tool_context.h"
#include "../../cursor/rectangle_cursor/rectangle_cursor.h"
#include "../../tool.h"
#include "brush.h"

#include <vector>

namespace spright
{
namespace editing
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
} // namespace editing
} // namespace spright
