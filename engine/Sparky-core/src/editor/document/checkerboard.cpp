
#include "checkerboard.h"

namespace my_app_editor { namespace document {
	void document::Checkerboard::create(my_app::editor::document::Document* document)
	{
		my_app::graphics::Layer* layer = document->getLayer(my_app::editor::document::DEFAULT_BACKGROUND_LAYER_ID);
	
		layer->add(new my_app_engine::graphics::LineShape(document->dimensions.left, 0, document->dimensions.right, 0, 0.5f, 0Xffff00ff));
	}
}}