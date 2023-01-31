
#include "checkerboard.h"

namespace spright { namespace document {
	void document::Checkerboard::create(spright::document::Document* document)
	{
		engine::graphics::Layer* layer = document->getLayerHandler()->getLayer(spright::document::DEFAULT_BACKGROUND_LAYER_ID);
	
		float left = document->dimensions.left;
		float right = document->dimensions.right;
		float bottom = document->dimensions.bottom;
		float top = document->dimensions.top;

		float checkerWidth = 4.0f;
		float tileSize = 0.5f;
		float delta = checkerWidth * tileSize;

		int counter = 1;
		bool even = false;
		for (float i = left; i < right; i += delta) {
			for (float j = bottom; j < top; j += delta) {
				counter++;
				int color = counter % 2 == 0 ? 0Xff787878 : 0XffE0E0E0;
				layer->add(new engine::graphics::Sprite(i, j, delta, delta, color));
			}

			counter = 1;
			even = !even;
			counter = even ? 0 : 1;
		}
	}
}}