#pragma once
#include "../../core/history/document_history.h"
#include "../../core/history/tile_undo.h"
#include "../brush.h"
#include "../paint_bucket/queue_linear_flood_fill.h"
#include "../tool/tool.h"

namespace spright
{
namespace editor
{
    class CircleTool : public Tool
    {
    public:
        CircleTool();

        void pointerMove(const ToolContext &) override;

        void pointerUp(const ToolContext &) override;

        void setFilled(bool isFilled);

        bool isFilled();

    private:
        void drawCircle(BoundsInt &bounds,
                        TileLayer &tileLayer,
                        const ToolContext &context,
                        TileUndo *tileUndo = nullptr);

        BoundsInt getCircleBounds(const ToolContext &, const TileLayer &);

    private:
        BoundsInt m_PrevCircleBounds;

        QueueLinearFloodFill m_FloodFill;

        bool m_IsFilled = false;
    };
} // namespace editor
} // namespace spright
