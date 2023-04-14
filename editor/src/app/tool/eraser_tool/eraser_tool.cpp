#include "eraser_tool.h"

namespace spright
{
namespace editor
{

    EraserTool::EraserTool(int eraserSize) : m_Size(eraserSize), Tool("erase")
    {
        m_EraserStroke = EraserStroke(m_Size);
    }

    void EraserTool::pointerDown(ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        m_Eraser.erase(activeLayer, activeLayer.getTilePos(context.pointer.curr), m_Size);
    }

    void EraserTool::pointerMove(ToolContext &context)
    {
        if (context.doc.isLeavingDrawing && context.doc.hasPrevDrawing())
        {
            m_EraserStroke.clear(context.doc.prevDrawing->getForegroundLayer());
        }

        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        TileLayer &drawLayer = context.doc.activeDrawing->getForegroundLayer();

        m_EraserStroke.draw(activeLayer, drawLayer, context.pointer.curr);

        if (context.pointer.isDown)
        {
            m_Eraser.erase(activeLayer, activeLayer.getTilePos(context.pointer.curr), m_Size);
        }
    }

    void EraserTool::deactivate(ToolContext &context)
    {
        if (context.doc.hasActiveDrawing())
        {
            m_EraserStroke.clear(context.doc.activeDrawing->getForegroundLayer());
        }
    }
    void EraserTool::setOptions(std::string json)
    {
        nlohmann::json parsedJson = nlohmann::json::parse(json);

        m_Size = parsedJson["size"];
    }

    std::string EraserTool::getOptions()
    {
        nlohmann::json json;

        json["size"] = m_Size;

        return json.dump();
    }
} // namespace editor
} // namespace spright
