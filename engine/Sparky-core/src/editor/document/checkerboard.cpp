
#include "checkerboard.h"

namespace spright_app { namespace document {
	void document::Checkerboard::create(spright_app::document::Document* document)
	{
		spright_engine::graphics::Layer* layer = document->getLayer(spright_app::document::DEFAULT_BACKGROUND_LAYER_ID);
	
		float left = document->dimensions.left;
		float right = document->dimensions.right;
		float bottom = document->dimensions.bottom;
		float top = document->dimensions.top;

		int counter = 0;
		bool even = false;
		for (float i = left; i < right; i += 0.5) {
			for (float j = bottom; j < top; j += 0.5) {
				counter++;
				int color = counter % 2 == 0 ? 0Xff787878 : 0XffE0E0E0;
				layer->add(new spright_engine::graphics::Sprite(i, j, 0.5f, 0.5f, color));
			}

			counter = 1;
			even = !even;
			counter = even ? 0 : 1;
		}
	}
}}