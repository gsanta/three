#include "tile_layer_builder.h"


TileLayerBuilder &TileLayerBuilder::withBounds(Bounds bounds)
{
    m_Bounds = bounds;

    return *this;
}

TileLayerBuilder &TileLayerBuilder::withBounds(BoundsInt bounds)
{
    m_BoundsInt = bounds;

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

TileLayerBuilder &TileLayerBuilder::withTile(const Vec2Int &pos, unsigned int color)
{
    m_TilePositions.push_back(pos);
    m_TileColors.push_back(color);

    return *this;
}

TileLayerBuilder &TileLayerBuilder::withTileFill(unsigned int color)
{
    m_Fill = true;
    m_TileFillColor = color;

    return *this;
}

TileLayer TileLayerBuilder::build()
{
    if (!m_BoundsInt.isDefault())
    {
        m_Bounds = Bounds(m_BoundsInt.minX * m_TileSize,
                          m_BoundsInt.minY * m_TileSize,
                          m_BoundsInt.maxX * m_TileSize,
                          m_BoundsInt.maxY * m_TileSize);
    }

    TileLayer layer("layer_" + std::to_string(m_Index), Group<Rect2D>(), m_Bounds, m_TileSize);

    Brush brush;

    if (m_Fill)
    {
        for (size_t i = 0; i < layer.getTileBounds().getWidth(); i++)
        {
            for (size_t j = 0; j < layer.getTileBounds().getHeight(); j++)
            {
                brush.paint(layer, Vec2Int(i, j), m_TileFillColor);
            }
        }
    }

    for (size_t i = 0; i < m_TilePositions.size(); i++)
    {
        brush.paint(layer, m_TilePositions[i], m_TileColors[i]);
    }

    return layer;
}
