#pragma once
#include "../src/app/tool/context/tool_context.h"
#include "../src/app/tool/tools/color_picker_tool/color_picker_tool.h"
#include "../src/app/tool/tools/move_tool/move_tool.h"
#include "../src/app/tool/tools/rectangle_tool/rectangle_tool.h"
#include "../src/app/tool/tools/rotate_tool/rotate_tool.h"
#include "../src/app/tool/tools/select_tool/select_tool.h"
#include "../src/app/tool/tools/shear_tool/shear_tool.h"
#include "pointer_info_builder.h"

class ToolContextBuilder
{
public:
    ToolContextBuilder &withPointerInfo(PointerInfoBuilder builder);

    ToolContext build(Document &document);

private:
    PointerInfoBuilder m_PointerInfo;
};
