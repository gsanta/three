#pragma once

#include "../../../../engine/graphics/renderable/rect2d.h"
#include "../../../document/document_store.h"
#include "../../../document/drawing.h"
#include "../../context/tool_context.h"
#include "../../cursor/rectangle_cursor/rectangle_cursor.h"
#include "../../tool.h"
#include "./box_selector.h"
#include "./rect_selector.h"
#include "./selection_buffer.h"
#include "./selection_mover.h"

#include <limits>
#include <memory>
#include <vector>

namespace spright
{
namespace editor
{
    using namespace ::spright::maths;
    using namespace ::spright::engine;

    class SelectTool : public Tool
    {
    public:
        const static int MODE_MOVE;

        const static int MODE_ROTATE;

        const static int MODE_SHEAR;

    public:
        SelectTool();

        void pointerDown(const ToolContext &) override;

        void pointerUp(const ToolContext &) override;

        void pointerMove(const ToolContext &) override;

        void setSelection(const std::vector<int> &indexes, Drawing &drawing);

        void setMode(int mode);

        SelectionBuffer &getSelectionBuffer();

    private:
        const static int PHASE_SELECTION;

        const static int PHASE_MANIPULATION;

    private:
        void recalcTileIndexesAndBounds(TileLayer &activeLayer, TileLayer &tempLayer);

        BoundsInt getBoundsOfImpactedArea(const BoundsInt &selectionBounds, const BoundsInt &maxBounds) const;

    private:
        std::shared_ptr<SelectionBuffer> m_SelectionBuffer;

        std::unique_ptr<BoxSelector> m_BoxSelector;

        std::unique_ptr<SelectionMover> m_SelectionMover;

        RectSelector m_RectSelector;

        vector<Vec2> m_OrigPositions;

        Bounds m_SelectionBounds;

        BoundsInt m_SelectionTileBounds;

        float m_NoMovementTolerance = 0.1f;

        int m_Mode = MODE_MOVE;

        int m_Phase = PHASE_SELECTION;
    };
} // namespace editor
} // namespace spright
