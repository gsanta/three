#include "./tile_view.h"

namespace spright
{
namespace engine
{
    TileView::TileView(const BoundsInt &tileBounds) : m_TileBounds(tileBounds)
    {
        m_IndexSize = tileBounds.getWidth() * tileBounds.getHeight();
        m_TileIndexes = new Renderable2D *[m_IndexSize]();
    }

    TileView::TileView(const TileView &tileHolder)
        : m_TileBounds(tileHolder.m_TileBounds), m_IndexSize(tileHolder.m_IndexSize)
    {
        m_TileIndexes = new Renderable2D *[m_IndexSize]();
    }

    TileView::~TileView()
    {
        delete[] m_TileIndexes;
    }

    TileView &TileView::operator=(const TileView &that)
    {
        if (this != &that)
        {
            m_TileBounds = that.m_TileBounds;
            m_IndexSize = m_TileBounds.getWidth() * m_TileBounds.getHeight();
            m_TileIndexes = new Renderable2D *[m_IndexSize]();

            m_Group.clear();
            // delete[] m_TileIndexes;

            // init();
            // copyGroup(that.m_Group);
        }

        return *this;
    }


    Rect2D *TileView::getAtTileIndex(int tilePos) const
    {
        return static_cast<Rect2D *>(m_TileIndexes[tilePos]);
    }

    Rect2D *TileView::getAtTilePos(int x, int y) const
    {
        return getAtTileIndex(getTileIndex(x, y));
    }

    int TileView::getTileIndex(int tileX, int tileY) const
    {
        return m_TileBounds.getWidth() * tileY + tileX;
    }

    Rect2D &TileView::add(const Rect2D &rect, const Vec2Int &tilePos)
    {
        int tileIndex = m_TileBounds.getWidth() * tilePos.y + tilePos.x;

        Rect2D &newRect = m_Group.add(rect);
        m_TileIndexes[tileIndex] = &newRect;

        newRect.setTileIndex(tileIndex);

        return newRect;
    }

    std::vector<Rect2D *> &TileView::getTiles()
    {
        return m_Group.getRenderables();
    }

    const std::vector<Rect2D *> &TileView::getTiles() const
    {
        return m_Group.getRenderables();
    }

    const BoundsInt &TileView::getTileBounds() const
    {
        return m_TileBounds;
    }
} // namespace engine
} // namespace spright
