#include "./tool_store.h"

#include "tool.h"
#include "tools/color_picker_tool/color_picker_tool.h"
#include "tools/rotate_tool/rotate_tool.h"
#include "tools/select_tool/select_tool.h"
#include "tools/shear_tool/shear_tool.h"

namespace spright
{
namespace editor
{
    Tool *ToolStore::getTool(std::string name) const
    {
        auto it = find_if(this->m_Tools.begin(), this->m_Tools.end(), [&name](const Tool *tool) {
            return tool->getName() == name;
        });

        return *it;
    }

    void ToolStore::addTool(Tool *tool)
    {
        m_Tools.push_back(tool);
    }

    SelectTool &ToolStore::getSelectTool()
    {
        return *dynamic_cast<SelectTool *>(getTool("select"));
    }

    ColorPickerTool &ToolStore::getColorPickerTool()
    {
        return *dynamic_cast<ColorPickerTool *>(getTool("color_picker"));
    }

    ShearTool &ToolStore::getShearTool()
    {
        return *dynamic_cast<ShearTool *>(getTool("shear"));
    }

    RotateTool &ToolStore::getRotateTool()
    {
        return *dynamic_cast<RotateTool *>(getTool("rotate"));
    }
} // namespace editor
} // namespace spright
