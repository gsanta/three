#include "eraser_tool.h"

namespace spright
{
namespace editor
{
    EraserTool::EraserTool(int eraserSize)
        : m_Size(eraserSize), Tool("erase", std::make_shared<EraserCursor>(eraserSize))
    {
    }

    void EraserTool::pointerDown(const ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        m_Eraser.erase(activeLayer, activeLayer.getTilePos(context.pointer.curr), m_Size);
    }

    void EraserTool::pointerMove(const ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        TileLayer &drawLayer = context.doc.activeDrawing->getForegroundLayer();

        if (context.pointer.isDown)
        {
            m_Eraser.erase(activeLayer, activeLayer.getTilePos(context.pointer.curr), m_Size);
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
