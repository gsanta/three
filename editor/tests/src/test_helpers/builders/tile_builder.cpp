#include "./tile_builder.h"

TileBuilder::TileBuilder(TileLayer &tileLayer) : m_TileLayer(tileLayer)
{
}

TileBuilder &TileBuilder::withPos(Vec2Int pos)
{
    m_Pos = pos;

    return *this;
}

TileBuilder &TileBuilder::withColor(int color)
{
    m_Color = color;

    return *this;
}

Rect2D TileBuilder::build()
{

    int tileIndex = m_TileLayer.getTileIndex(m_Pos.x, m_Pos.y);
    Vec2 worldPos = m_TileLayer.getBottomLeftPos(tileIndex);

    return Rect2D(worldPos.x, worldPos.y, m_TileLayer.getTileSize(), m_TileLayer.getTileSize(), m_Color);
}
