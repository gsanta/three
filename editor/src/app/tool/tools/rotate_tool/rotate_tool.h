#pragma once

#include "../../../algorithm/rotate.h"
#include "../../../algorithm/tile_operations.h"
#include "../../../core/run_loop/timer.h"
#include "../../common/restorable_area.h"
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

        void execute(const ToolContext &toolContext) override;

    private:
        void rotateSelection(const ToolContext &toolContext, double angle);

        /*
         * Get the maximum area that can be impacted by the rotation, so original state can be restored
         */
        BoundsInt getBoundsOfImpactedArea(const BoundsInt &selectionBounds, const BoundsInt &maxBounds) const;

        double getRotationAngle(const Vec2 &cursorPos, const Vec2 &centerPos) const;

        /* angle between 0 to 2 Pi and zero is the up direction */
        double getNormalizedAngle(double angle) const;

    private:
        float m_RotateInRad = 0;

        double m_PrevRotationAngle = 0;

        RestorableArea m_RestorableArea;

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