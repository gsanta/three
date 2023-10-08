#pragma once

#include "../../../algorithm/rotate.h"
#include "../../../algorithm/tile_operations.h"
#include "../../../core/run_loop/timer.h"
#include "../../select_tool/select_tool.h"
#include "../../tool/tool.h"
#include "../../tool/tool_context.h"
#include "../../tool_handler.h"

#include <cmath>

namespace spright
{
namespace editor
{
    class RotateTool : public Tool
    {
    public:
        RotateTool();

        void setRotationInRad(float rad);

        void pointerDown(const ToolContext &toolContext) override;

        void pointerMove(const ToolContext &toolContext) override;

        void pointerUp(const ToolContext &toolContext) override;

        void execute(ToolContext &toolContext) override;

    private:
        void saveImpactedArea(const TileLayer &activeLayer, const SelectionBuffer &selectionBuffer);

        void restoreImpactedArea(const ToolContext &toolContext);

        void rotateSelection(const ToolContext &toolContext, double angle);

        BoundsInt getBoundsOfImpactedArea(const BoundsInt &selectionBounds, const BoundsInt &maxBounds) const;

        double getRotationAngle(Vec2 cursorPos);

    private:
        float m_RotateInRad = 0;

        double m_PrevRotationAngle = 0;

        Timer *m_Timer;

        std::unique_ptr<TileView> m_OrigTiles;

        std::vector<int> m_OrigIndexes;

        Vec2 m_RotationCenter;

        std::vector<double> m_RotationPoints = {0,
                                                M_PI - 3.0 * M_PI_4,
                                                M_PI - 2.0 * M_PI_4,
                                                M_PI - M_PI_4,
                                                M_PI,
                                                M_PI + M_PI_4,
                                                M_PI + 2.0 * M_PI_4,
                                                M_PI + 3.0 * M_PI_4};
    };
} // namespace editor
} // namespace spright
