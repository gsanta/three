#pragma once
#include <vector>
#include "../src/engine/graphics/layer/tileLayer.h"

using namespace ::spright::engine;

class TestDocumentFactory {
public:
	static std::vector<TileLayer> createLayers(size_t num);
};