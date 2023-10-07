#pragma once

#include "../../../algorithm/rotate.h"
#include "../../tool/tool.h"
#include "../../tool/tool_context.h"
#include "../../tool_handler.h"

namespace spright
{
namespace editor
{
    class RotateTool : public Tool
    {
    public:
        RotateTool();

        void execute(ToolContext &toolContext) override;
    };
} // namespace editor
} // namespace spright
