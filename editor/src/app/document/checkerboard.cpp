
#include "checkerboard.h"

namespace spright { namespace editor {
	void Checkerboard::create(Document* document)
	{
		TileLayer* layer = document->getLayerHandler()->getTileLayer(DEFAULT_BACKGROUND_LAYER_ID);
	
		float left = document->getDimensions().left;
		float right = document->getDimensions().right;
		float bottom = document->getDimensions().bottom;
		float top = document->getDimensions().top;

		float tileSize = layer->getTileSize();

		int counter = 1;
		bool even = false;
		for (float i = left; i < right; i += tileSize) {
			for (float j = bottom; j < top; j += tileSize) {
				counter++;
				int color = counter % 2 == 0 ? 0Xff787878 : 0XffE0E0E0;
				layer->add(new Rect2D(i, j, tileSize, tileSize, color));
			}

			counter = 1;
			even = !even;
			counter = even ? 0 : 1;
		}
	}
}}