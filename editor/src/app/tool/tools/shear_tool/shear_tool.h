#pragma once

#include "../../../algorithm/rotate.h"
#include "../../tool/tool.h"
#include "../../tool/tool_context.h"
#include "../../tool_handler.h"
// #include "../../../algorithm/shear_vertical.h"

namespace spright
{
namespace editor
{
    class ShearTool : public Tool
    {
    public:
        ShearTool();

        void execute(ToolContext &toolContext) override;
    };
} // namespace editor
} // namespace spright
