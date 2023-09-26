#include "./circle_tool.h"

namespace spright
{
namespace editor
{
    CircleTool::CircleTool() : Tool("circle", std::make_shared<RectangleCursor>(1, true))
    {
    }

    void CircleTool::pointerMove(const ToolContext &context)
    {
        if (!context.pointer.isDown)
        {
            return;
        }

        TileLayer &foregroundLayer = context.doc.activeDrawing->getTempLayer();
        BoundsInt bounds = getCircleBounds(context, foregroundLayer);

        if (bounds.getWidth() <= 2 && bounds.getHeight() <= 2)
        {
            return;
        }

        if (bounds != m_PrevCircleBounds)
        {
            foregroundLayer.clear();
            m_PrevCircleBounds = bounds;
        }
        drawCircle(bounds, foregroundLayer, context);
    }

    void CircleTool::pointerUp(const ToolContext &context)
    {
        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        BoundsInt bounds = getCircleBounds(context, activeLayer);

        TileUndo tileUndo = TileUndo::createForActiveTileLayer(*context.doc.document);

        drawCircle(bounds, activeLayer, context, &tileUndo);

        if (m_IsFilled)
        {
            m_FloodFill.floodFill(
                context.doc.activeDrawing->getActiveLayer(),
                bounds.getCenter().x,
                bounds.getCenter().y,
                context.tool.selectedColor,
                [&](std::shared_ptr<Rect2D> prev, std::shared_ptr<Rect2D> next) { tileUndo.addTile(prev, next); });
        }

        context.doc.document->getHistory()->add(std::make_shared<TileUndo>(tileUndo));
        TileLayer &foregroundLayer = context.doc.activeDrawing->getTempLayer();
        foregroundLayer.clear();
    }

    void CircleTool::setFilled(bool isFilled)
    {
        m_IsFilled = isFilled;
    }

    bool CircleTool::isFilled()
    {
        return m_IsFilled;
    }

    void CircleTool::drawCircle(BoundsInt &bounds, TileLayer &tileLayer, const ToolContext &context, TileUndo *tileUndo)
    {
        int color = context.tool.selectedColor;
        std::vector<Rect2D> tiles;

        int centerX = std::round((bounds.minX + bounds.maxX) / 2);
        int centerY = std::round((bounds.minY + bounds.maxY) / 2);

        bool evenX = (bounds.minX + bounds.maxX) % 2;
        bool evenY = (bounds.minY + bounds.maxY) % 2;

        float radiusX = bounds.maxX - centerX;
        float radiusY = bounds.maxY - centerY;

        Brush brush;

        onRect2DCreate handleOnRect2DCreate = defaultRect2DCreate;

        if (tileUndo)
        {

            handleOnRect2DCreate = [&](std::shared_ptr<Rect2D> prev, std::shared_ptr<Rect2D> next) {
                tileUndo->addTile(prev, next);
            };
        }

        for (int x = bounds.minX; x <= centerX; x++)
        {
            float angle = std::acos((x - centerX) / radiusX);
            int y = std::round(radiusY * std::sin(angle) + centerY);
            float halfTileSize = tileLayer.getTileSize() / 2;
            brush.paint(tileLayer, Vec2Int(x - evenX, y), color, handleOnRect2DCreate);
            brush.paint(tileLayer, Vec2Int(x - evenX, 2 * centerY - y - evenY), color, handleOnRect2DCreate);
            brush.paint(tileLayer, Vec2Int(2 * centerX - x, y), color, handleOnRect2DCreate);
            brush.paint(tileLayer, Vec2Int(2 * centerX - x, 2 * centerY - y - evenY), color, handleOnRect2DCreate);
        }

        for (int y = bounds.minY; y <= centerY; y++)
        {
            float angle = std::asin((y - centerY) / radiusY);
            int x = std::round(radiusX * std::cos(angle) + centerX);
            float halfTileSize = tileLayer.getTileSize() / 2;
            brush.paint(tileLayer, Vec2Int(x, y - evenY), color, handleOnRect2DCreate);
            brush.paint(tileLayer, Vec2Int(2 * centerX - x - evenX, y - evenY), color, handleOnRect2DCreate);
            brush.paint(tileLayer, Vec2Int(x, 2 * centerY - y), color, handleOnRect2DCreate);
            brush.paint(tileLayer, Vec2Int(2 * centerX - x - evenX, 2 * centerY - y), color, handleOnRect2DCreate);
        }
    }

    BoundsInt CircleTool::getCircleBounds(const ToolContext &context, const TileLayer &tileLayer)
    {
        Vec2 down = context.pointer.down;
        Vec2 curr = context.pointer.curr;

        Bounds bounds = Bounds::createWithPositions(down.x, down.y, curr.x, curr.y);
        Vec2Int bottomLeftTile = tileLayer.getTilePos(bounds.getBottomLeft());
        Vec2Int topRightTile = tileLayer.getTilePos(bounds.getTopRight());
        BoundsInt boundsInt(bottomLeftTile.x, bottomLeftTile.y, topRightTile.x, topRightTile.y);

        return boundsInt;
    }


} // namespace editor
} // namespace spright
