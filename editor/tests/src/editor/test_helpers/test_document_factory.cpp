#include "test_document_factory.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"

std::vector<TileLayer> TestDocumentFactory::createTileLayers(size_t num) {
	std::vector<TileLayer> layers;
	
	for (int i = 0; i < num; i++) {
		TileLayer layer("layer" + std::to_string(i), "id" + std::to_string(i), Group<Rect2D>(new HeadlessRenderer2D()), Dimensions(-3.0f, 3.0f, -3.0f, 3.0f), 1.0f);

		layers.push_back(layer);
	}

	return layers;
}

TileLayer TestDocumentFactory::createTileLayer(size_t index, float tileSize, Dimensions dimensions) {
	TileLayer layer("layer" + std::to_string(index), "id" + std::to_string(index), Group<Rect2D>(new HeadlessRenderer2D()), dimensions, tileSize);

	return layer;
}