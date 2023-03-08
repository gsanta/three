#include "test_document_factory.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"

std::vector<TileLayer> TestDocumentFactory::createLayers(size_t num) {
	std::vector<TileLayer> layers;
	
	Container container(Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));

	for (int i = 0; i < num; i++) {
		TileLayer layer("layer" + std::to_string(i + 1), "id" + std::to_string(i + 1), Group<Rect2D>(new HeadlessRenderer2D()), &container, 1.0f);

		layers.push_back(layer);
	}

	return layers;
}