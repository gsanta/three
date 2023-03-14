#pragma once
#include <vector>
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/layer/dimensions.h"

using namespace ::spright::engine;

class TestDocumentFactory {
public:
	static std::vector<TileLayer> createTileLayers(size_t num);
	static TileLayer createTileLayer(size_t index, float tileSize = TileLayer::defaultTileSize, Dimensions dimensions = Dimensions(-3.0f, 3.0f, -3.0f, 3.0f));
};