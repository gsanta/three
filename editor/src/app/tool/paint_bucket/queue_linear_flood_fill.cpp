#include "queue_linear_flood_fill.h"

namespace spright {

    void QueueLinearFloodFill::floodFill(TileLayer* layer, int x, int y, int color) {
        layer->getAtTileIndex(1851);

        int tileIndex = layer->getTileIndex(x, y);
        Renderable2D* renderable = layer->getAtTileIndex(tileIndex);
        layer->getAtTileIndex(1851);

        m_IsEmptyTile = renderable == nullptr;
        
        if (renderable) {
            m_SourceColor = renderable->getColor();
        }
        layer->getAtTileIndex(1851);

        linearFill(layer, x, y, color);

        while (m_Queue.getCount() > 0) {

            FloodFillRange range = m_Queue.popFirst();

            int up = range.y - 1;
            int down = range.y + 1;

            for (int i = range.startX; i <= range.endX; i++) {
                if (checkPoint(layer, i, up, color)) {
                    linearFill(layer, i, up, color);
                }

                if (checkPoint(layer, i, down, color)) {
                    linearFill(layer, i, down, color);
                }
            }
        }
    }

	void QueueLinearFloodFill::linearFill(TileLayer* layer, int x, int y, int color)
	{

		int leftMostX = x;

        while (true) {
            setColor(layer, leftMostX, y, color);
            layer->getAtTileIndex(1851);

            m_VisitedIndexes.insert(layer->getTileIndex(leftMostX, y));
            leftMostX -= 1;
            if (!checkPoint(layer, leftMostX, y, color)) {
                break;
            }
        }
        leftMostX += 1;

        int rightMostX = x;
        while (true) {
            auto testTile = layer->getAtTileIndex(1851);

            setColor(layer, rightMostX, y, color);
            layer->getAtTileIndex(1851);

            m_VisitedIndexes.insert(layer->getTileIndex(leftMostX, y));
            rightMostX += 1;
            if (!checkPoint(layer, rightMostX, y, color)) {
                break;
            }
        }
        rightMostX -= 1;
	
        m_Queue.addToEnd(FloodFillRange(leftMostX, rightMostX, y));
    }

    bool QueueLinearFloodFill::checkPoint(TileLayer* layer, int x, int y, int targetColor)
    {
        int tileIndex = layer->getTileIndex(x, y);

        bool notVisited = m_VisitedIndexes.find(tileIndex) == m_VisitedIndexes.end();

        if (
            x >= 0 &&
            x < layer->getTileBounds().getWidth() &&
            y >= 0 &&
            y < layer->getTileBounds().getHeight() &&
            notVisited &&
            isPixelWithinColorTolerance(layer, tileIndex)
        ) {
            return true;
        }
        return false;
    }

    bool QueueLinearFloodFill::isPixelWithinColorTolerance(TileLayer* layer, int tileIndex) {
        Renderable2D* renderable = layer->getAtTileIndex(tileIndex);

        if (renderable == nullptr) {
            return m_IsEmptyTile;
        }

        return renderable->getColor() == m_SourceColor;
    }

    void QueueLinearFloodFill::setColor(TileLayer* layer, int x, int y, int color)
    {
        int tileIndex = layer->getTileIndex(x, y);
        
        Renderable2D* renderable = layer->getAtTileIndex(tileIndex);

        if (renderable == nullptr) {
            Vec2 bottomLeftPos = layer->getBottomLeftPos(tileIndex);
            float tileSize = layer->getTileSize();
            layer->add(new Sprite(bottomLeftPos.x, bottomLeftPos.y, tileSize, tileSize, color));
        }
        else {
            renderable->setColor(color);
        }
    }
}