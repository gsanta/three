#include "eraser_tool.h"

namespace spright
{
namespace editor
{
    EraserTool::EraserTool(int eraserSize)
        : m_Size(eraserSize), Tool("erase", std::make_shared<RectangleCursor>(eraserSize))
    {
    }

    void EraserTool::pointerDown(const ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        erase(context, false);
    }

    void EraserTool::pointerMove(const ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        if (context.pointer.isDown)
        {
            erase(context, true);
        }
    }

    void EraserTool::erase(const ToolContext &context, bool isPointerMove)
    {
        if (!isPointerMove)
        {
            context.doc.document->getHistory()->add(std::make_shared<EraseUndo>(*context.doc.document));
        }

        EraseUndo *eraseUndo = dynamic_cast<EraseUndo *>(context.doc.document->getHistory()->peek());

        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        m_Eraser.erase(activeLayer,
                       activeLayer.getTilePos(context.pointer.curr),
                       m_Size,
                       [&](std::shared_ptr<Rect2D> tile) { eraseUndo->addTile(tile); });
    }

    float EraserTool::getStrokeSize() const
    {
        auto cursor = std::dynamic_pointer_cast<RectangleCursor>(getCursor());
        return cursor->getRectangleStroke().getStrokeWidth();
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

    void EraserTool::setEraserSize(int size)
    {
        m_Size = size;
        setCursor(std::make_shared<RectangleCursor>(m_Size));
    }
} // namespace editor
} // namespace spright
