#include "queue_linear_flood_fill.h"

namespace spright_app {
	void QueueLinearFloodFill::linearFill(TileLayer* layer, int x, int y, int color)
	{

		int leftMostX = x;
        int tileIndex = layer->getTileIndex(x, y);

        while (true) {
            layer->getAtTilePos(leftMostX, y)->setColor(color)
            this.pixelsChecked[pixelIndex] = true;
            leftMostX -= 1;
            tileIndex -= 1;
            if (!this.checkPoint(leftMostX, y)) {
                break;
            }
        }
        leftMostX += 1;
	}
    void QueueLinearFloodFill::checkPoint(TileLayer* layer, int x, int y)
    {
        int tileIndex = layer->getTileIndex(x, y);

        if (
            x >= 0 &&
            x < width &&
            y >= 0 &&
            y < height &&
            !this.pixelsChecked[pixelIndex] &&
            this.isPixelWithinColorTolerance(x, y)
            ) {
            return true;
        }
        return false;
    }
}