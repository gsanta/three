#pragma once
#include "test_document_factory.h"
#include <vector>
#include "../src/engine/graphics/renderable/bounds.h"
#include "tile_layer_builder.h"

using namespace ::spright::engine;

class DrawingBuilder {
private:
	Bounds m_Bounds = Bounds::createWithPositions(-3.0f, 3.0f, -3.0f, 3.0f);
	vector<TileLayerBuilder> m_TileLayers;
public:
	DrawingBuilder& withBounds(Bounds bounds);
	DrawingBuilder& withTileLayer(TileLayerBuilder props);
	DrawingBuilder& withTileLayer();
	Drawing build();
};