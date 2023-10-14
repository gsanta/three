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
#include "./wand_selector.h"

#include <limits>
#include <memory>
#include <vector>

namespace spright
{
namespace editor
{
    using namespace ::spright::maths;
    using namespace ::spright::engine;

    enum SelectionPhase
    {
        selection,
        manipulation
    };

    enum SelectionManipulationMode
    {
        manip_move,
        manip_rotate,
        manip_shear
    };

    enum SelectionType
    {
        rectangle,
        wand
    };

    class SelectTool : public Tool
    {
    public:
        SelectTool();

        void pointerDown(const ToolContext &) override;

        void pointerUp(const ToolContext &) override;

        void pointerMove(const ToolContext &) override;

        void setSelection(const std::vector<int> &indexes, Drawing &drawing);

        void setMode(SelectionManipulationMode mode);

        void setSelectionType(SelectionType selectionType);

        SelectionBuffer &getSelectionBuffer();

    private:
        void recalcTileIndexesAndBounds(TileLayer &activeLayer, TileLayer &tempLayer);

        void startManipulation(const ToolContext &context);

        void moveManipulation(const ToolContext &context);

        void endManipulation(const ToolContext &context);

        void startSelection(const ToolContext &context);

        void moveSelection(const ToolContext &context);

        void endSelection(const ToolContext &context);

    private:
        SelectionBuffer m_SelectionBuffer;

        BoxSelector m_BoxSelector;

        WandSelector m_WandSelector;

        std::unique_ptr<SelectionMover> m_SelectionMover;

        RectSelector m_RectSelector;

        vector<Vec2> m_OrigPositions;

        Bounds m_SelectionBounds;

        BoundsInt m_SelectionTileBounds;

        float m_NoMovementTolerance = 0.1f;

        SelectionType m_SelectionType = rectangle;

        SelectionPhase m_Phase = selection;

        SelectionManipulationMode m_Mode = manip_move;
    };
} // namespace editor
} // namespace spright
