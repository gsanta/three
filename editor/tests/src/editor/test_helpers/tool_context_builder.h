#pragma once
#include "../src/app/tool/rectangle_tool/rectangle_tool.h"
#include "../src/app/tool/select_tool/select_tool.h"
#include "../src/app/tool/tool/tool_context.h"
#include "pointer_info_builder.h"

class ToolContextBuilder
{
public:
    ToolContextBuilder &withPointerInfo(PointerInfoBuilder builder);

    ToolContext build(Document &document);

private:
    PointerInfoBuilder m_PointerInfo;
};
