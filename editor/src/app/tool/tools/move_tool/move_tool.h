#pragma once

#include "../../../core/history/tile_undo.h"
#include "../../context/tool_context.h"
#include "../../tool.h"
#include "./selection_mover.h"

#include <memory>

namespace spright
{
namespace editor
{
    class MoveTool : public Tool
    {
    public:
        MoveTool();

        void pointerDown(const ToolContext &toolContext) override;

        void pointerMove(const ToolContext &toolContext) override;

        void pointerUp( ToolContext &toolContext) override;

    private:
        SelectionMover m_SelectionMover;

        std::unique_ptr<TileUndo> m_Undo;
    };
} // namespace editor
} // namespace spright
