#include "./tool_store.h"

namespace spright
{
namespace editor
{
    Tool *ToolStore::getTool(string name) const
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
} // namespace editor
} // namespace spright
