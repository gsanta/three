#pragma once

#include "../../../../engine/graphics/mesh/meshes/rect2d.h"
#include "../../../../engine/scene/canvas/tile_canvas.h"
#include "../../../document/document_store.h"
#include "../../context/tool_context.h"
#include "../../cursor/rectangle_cursor/rectangle_cursor.h"
#include "../../pixel_tool.h"
#include "./box_selector.h"
#include "./selection_buffer.h"
#include "./wand_selector.h"

#include <limits>
#include <memory>
#include <vector>

namespace spright
{
namespace editing
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

    class SelectTool : public PixelTool
    {
    public:
        SelectTool();

        void pointerDown(const ToolContext &) override;

        void pointerUp(ToolContext &) override;

        void pointerMove(const ToolContext &) override;

        void syncSelection(TileCanvas &drawing, const std::vector<int> &tileIndexes);

        void setSelection(const std::vector<int> &indexes, TileCanvas &drawing, TileLayer &layer);

        void setMode(SelectionManipulationMode mode);

        void setSelectionType(SelectionType selectionType);

        SelectionBuffer &getSelectionBuffer();

    private:
        void startManipulation(const ToolContext &context);

        void moveManipulation(const ToolContext &context);

        void endManipulation(ToolContext &context);

        void startSelection(const ToolContext &context);

        void moveSelection(const ToolContext &context);

        void endSelection(const ToolContext &context);

    private:
        SelectionBuffer m_SelectionBuffer;

        BoxSelector m_BoxSelector;

        WandSelector m_WandSelector;

        float m_NoMovementTolerance = 0.1f;

        SelectionType m_SelectionType = rectangle;

        SelectionManipulationMode m_Mode = manip_move;

        SelectionPhase m_Phase = selection;
    };
} // namespace editing
} // namespace spright
