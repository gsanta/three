#pragma once

#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../document/document_store.h"
#include "../../document/drawing.h"
#include "../common/selection_box.h"
#include "../tool/tool.h"
#include "../tool/tool_context.h"

#include <vector>

namespace spright
{
namespace editor
{
    using namespace ::spright::maths;
    using namespace ::spright::engine;
    using namespace editor;

    class SelectTool : public Tool
    {
    private:
        DocumentStore *m_DocumentStore;
        SelectionBox m_SelectionBox;

        vector<Rect2D *> m_Data;
        vector<Vec2> m_OrigPositions;

        float m_NoMovementTolerance = 0.1f;
        bool m_IsMove = false;

    public:
        SelectTool(DocumentStore *documentHandler);
        void pointerDown(ToolContext &) override;
        void pointerUp(ToolContext &) override;
        void pointerMove(ToolContext &) override;

    private:
        void makeSelection(ToolContext &);
        void makePointSelection(ToolContext &);
        void moveSelection(Vec2 tileDelta, Drawing *activeDrawing);
    };
} // namespace editor
} // namespace spright
