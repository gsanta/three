
#include "checkerboard.h"

namespace spright { namespace editor {
	void Checkerboard::create(Document* document)
	{
		TileLayer& layer = document->getActiveFrame().getBackgroundLayers()[0];

		float left = document->getDimensions().minX;
		float right = document->getDimensions().maxX;
		float bottom = document->getDimensions().minY;
		float top = document->getDimensions().maxY;

		float tileSize = layer.getTileSize();

		int counter = 1;
		bool even = false;

		for (float i = left; i < right; i += tileSize) {
			for (float j = bottom; j < top; j += tileSize) {
				counter++;
				int color = counter % 2 == 0 ? 0Xff787878 : 0XffE0E0E0;
				layer.add(Rect2D(i, j, tileSize, tileSize, color));
			}

			counter = 1;
			even = !even;
			counter = even ? 0 : 1;
		}
	}
}}