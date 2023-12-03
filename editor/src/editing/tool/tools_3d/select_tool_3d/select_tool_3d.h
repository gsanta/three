#pragma once

#include "../../../../engine/algorithms/intersect_ray_box.h"
#include "../../tool.h"

namespace spright
{
namespace editing
{
    class SelectTool3d : public Tool
    {
    public:
        SelectTool3d();

        void pointerDown(const ToolContext &) override;

        void pointerUp(ToolContext &) override;

        void pointerMove(const ToolContext &) override;
    };
} // namespace editing
} // namespace spright
