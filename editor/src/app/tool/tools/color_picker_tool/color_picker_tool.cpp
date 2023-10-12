#include "color_picker_tool.h"

namespace spright
{
namespace editor
{

    ColorPickerTool::ColorPickerTool(EventEmitter *eventEmitter) : m_EventEmitter(eventEmitter), Tool("color_picker")
    {
    }

    void ColorPickerTool::pointerDown(const ToolContext &context)
    {

        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        TileLayer &tileLayer = context.doc.activeDrawing->getActiveLayer();
        Vec2Int tilePos = tileLayer.getTilePos(context.pointer.curr);
        int tileIndex = tileLayer.getTileIndex(tilePos.x, tilePos.y);
        Rect2D *tile = tileLayer.getAtTileIndex(tileIndex);

        if (tile != nullptr)
        {
            unsigned int color = tile->getColor();

            if (color != m_Color)
            {
                m_Color = color;

                emitColorChange();
            }
        }
    }

    unsigned int ColorPickerTool::getPickedColor() const
    {
        return m_Color;
    }

    std::string ColorPickerTool::getData()
    {
        nlohmann::json json = {};

        json["color"] = m_Color;

        return json.dump();
    }

    unsigned int ColorPickerTool::getColor() const
    {
        return m_Color;
    }

    void ColorPickerTool::setColor(unsigned int color)
    {
        m_Color = color;
    }


    void ColorPickerTool::emitColorChange() const
    {
        nlohmann::json json = {
            {"tool", getName()},
        };

        if (m_EventEmitter != nullptr)
        {
            m_EventEmitter->emitChange("tool_data_changed", json);
        }
    }
} // namespace editor
} // namespace spright
