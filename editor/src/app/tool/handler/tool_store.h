#pragma once

#include "../color_picker_tool.h"
#include "../select_tool/select_tool.h"
#include "../tool/tool.h"

#include <vector>

namespace spright
{
namespace editor
{
    class ToolStore
    {
    public:
        Tool *getTool(string name) const;

        void addTool(Tool *tool);

        SelectTool &getSelectTool();

        ColorPickerTool &getColorPickerTool();

    private:
        std::vector<Tool *> m_Tools;
    };
} // namespace editor
} // namespace spright
