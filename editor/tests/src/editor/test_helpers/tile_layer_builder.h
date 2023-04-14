#pragma once

#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/renderable/bounds.h"

using namespace ::spright::engine;

class TileLayerBuilder
{
private:
    size_t m_Index;
    float m_TileSize = TileLayer::defaultTileSize;
    Bounds m_Bounds = Bounds::createWithPositions(-3.0f, 3.0f, -3.0f, 3.0f);

public:
    TileLayerBuilder &withBounds(Bounds bounds);
    TileLayerBuilder &withIndex(size_t index);
    TileLayerBuilder &withTileSize(float tileSize);
    TileLayer build();
};
