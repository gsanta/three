#pragma once

#include <string>
#include <vector>

namespace spright
{
namespace editor
{
    class Tool;
    class SelectTool;
    class ShearTool;
    class ColorPickerTool;
    class RotateTool;

    class ToolStore
    {
    public:
        Tool *getTool(std::string name) const;

        void addTool(Tool *tool);

        SelectTool &getSelectTool();

        ColorPickerTool &getColorPickerTool();

        ShearTool &getShearTool();

        RotateTool &getRotateTool();

    private:
        std::vector<Tool *> m_Tools;
    };
} // namespace editor
} // namespace spright
