#pragma once

#include "../select_tool/selection_buffer.h"

namespace spright
{
namespace editor
{
    struct ToolInfo
    {
        SelectionBuffer *selectionBuffer;

        unsigned int selectedColor;
    };
} // namespace editor
} // namespace spright
