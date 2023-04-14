#include "tile_layer_builder.h"


TileLayerBuilder &TileLayerBuilder::withBounds(Bounds bounds)
{
    m_Bounds = bounds;

    return *this;
}

TileLayerBuilder &TileLayerBuilder::withIndex(size_t index)
{
    m_Index = index;

    return *this;
}

TileLayerBuilder &TileLayerBuilder::withTileSize(float tileSize)
{
    m_TileSize = tileSize;

    return *this;
}

TileLayer TileLayerBuilder::build()
{
    TileLayer layer("layer_" + std::to_string(m_Index), Group<Rect2D>(new HeadlessRenderer2D()), m_Bounds, m_TileSize);

    return layer;
}
