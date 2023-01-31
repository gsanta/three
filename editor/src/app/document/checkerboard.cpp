
#include "checkerboard.h"

namespace spright { namespace document {
	void document::Checkerboard::create(spright::document::Document* document)
	{
		engine::graphics::TileLayer* layer = document->getLayerHandler()->getTileLayer(spright::document::DEFAULT_BACKGROUND_LAYER_ID);
	
		float left = document->dimensions.left;
		float right = document->dimensions.right;
		float bottom = document->dimensions.bottom;
		float top = document->dimensions.top;

		float tileSize = layer->getTileSize();

		int counter = 1;
		bool even = false;
		for (float i = left; i < right; i += tileSize) {
			for (float j = bottom; j < top; j += tileSize) {
				counter++;
				int color = counter % 2 == 0 ? 0Xff787878 : 0XffE0E0E0;
				layer->add(new engine::graphics::Sprite(i, j, tileSize, tileSize, color));
			}

			counter = 1;
			even = !even;
			counter = even ? 0 : 1;
		}
	}
}}