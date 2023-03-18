#pragma once
#include <vector>
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/renderable/bounds.h"

using namespace ::spright::engine;

class TestDocumentFactory {
public:
	static std::vector<TileLayer> createTileLayers(size_t num);
	static TileLayer createTileLayer(size_t index, float tileSize = TileLayer::defaultTileSize, Bounds bounds = Bounds::createWithPositions(-3.0f, 3.0f, -3.0f, 3.0f));
};