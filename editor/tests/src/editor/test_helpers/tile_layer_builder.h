#pragma once

#include "../src/app/tool/brush.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/renderable/bounds.h"
#include "../src/engine/graphics/renderable/rect2d.h"

#include <vector>

using namespace ::spright::engine;
using namespace ::spright::editor;

class TileLayerBuilder
{
public:
    TileLayerBuilder &withBounds(Bounds bounds);

    TileLayerBuilder &withBounds(BoundsInt bounds);

    TileLayerBuilder &withIndex(size_t index);

    TileLayerBuilder &withTileSize(float tileSize);

    TileLayerBuilder &withTile(const Vec2Int &pos, unsigned int color = 0xFFFFFFFF);

    TileLayerBuilder &withTileFill(unsigned int color = 0xFFFFFFFF);

    TileLayer build();

private:
    size_t m_Index;

    float m_TileSize = 1;

    Bounds m_Bounds = Bounds::createWithPositions(-3.0f, -3.0f, 3.0f, 3.0f);

    BoundsInt m_BoundsInt;

    bool m_Fill = false;

    unsigned int m_TileFillColor;

    std::vector<Vec2Int> m_TilePositions;

    std::vector<unsigned int> m_TileColors;
};
