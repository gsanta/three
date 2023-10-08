#include "./tile_view.h"

namespace spright
{
namespace engine
{
    TileView::TileView(const Bounds &bounds, float tileSize) : m_Bounds(bounds), m_TileSize(tileSize)
    {
        m_TileBounds =
            BoundsInt(0, 0, ceil((bounds.maxX - bounds.minX) / tileSize), ceil((bounds.maxY - bounds.minY) / tileSize));
        m_IndexSize = m_TileBounds.getWidth() * m_TileBounds.getHeight();
        m_TileIndexes = new Renderable2D *[m_IndexSize]();
    }

    TileView::TileView(const TileView &tileView)
        : m_Bounds(tileView.m_Bounds), m_TileSize(tileView.m_TileSize), m_TileBounds(tileView.m_TileBounds),
          m_IndexSize(tileView.m_IndexSize)
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
            m_TileSize = that.m_TileSize;
            m_Bounds = that.m_Bounds;
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

    Vec2 TileView::getCenterPos(const Vec2 &worldPos) const
    {
        Vec2Int tilePos = getTilePos(worldPos);
        float tileSize = m_TileSize;

        float x = static_cast<float>(tilePos.x) * tileSize + m_Bounds.minX + m_TileSize / 2;
        float y = static_cast<float>(tilePos.y) * tileSize + m_Bounds.minY + m_TileSize / 2;

        return Vec2(x, y);
    }

    Vec2 TileView::getCenterPos(int tileIndex) const
    {
        int y = tileIndex / m_TileBounds.getWidth();
        int x = tileIndex % m_TileBounds.getWidth();
        return Vec2(x * m_TileSize + m_Bounds.minX + m_TileSize / 2, y * m_TileSize + m_Bounds.minY + m_TileSize / 2);
    }

    Vec2 TileView::getCenterPos(const Vec2Int &tilePos) const
    {
        return getCenterPos(getTileIndex(tilePos.x, tilePos.y));
    }


    Vec2 TileView::getBottomLeftPos(int tileIndex) const
    {
        Vec2 centerPos = getCenterPos(tileIndex);
        centerPos.x -= m_TileSize / 2.0f;
        centerPos.y -= m_TileSize / 2.0f;

        return centerPos;
    }

    Vec2 TileView::getBottomLeftPos(const Vec2 &worldPos) const
    {
        Vec2 centerPos = getCenterPos(worldPos);
        centerPos.x -= m_TileSize / 2.0f;
        centerPos.y -= m_TileSize / 2.0f;

        return centerPos;
    }

    Vec2 TileView::getBottomLeftPos(const Vec2Int &tilePos) const
    {
        return getBottomLeftPos(getTileIndex(tilePos.x, tilePos.y));
    }

    // TODO: check if it works for both even and odd number of tiles
    Vec2Int TileView::getTilePos(const Vec2 &pos) const
    {
        Vec2 adjustedPos(pos.x - m_Bounds.minX, pos.y - m_Bounds.minY);
        float tileSize = m_TileSize;
        int tileX = (int)(adjustedPos.x / tileSize);

        int tileY = (int)(adjustedPos.y / tileSize);

        return Vec2Int(tileX, tileY);
    }


    Rect2D *TileView::getAtTileIndex(int tilePos) const
    {
        if (tilePos >= m_IndexSize || tilePos < 0)
        {
            return nullptr;
        }

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

    int TileView::getTileIndex(Vec2 worldPos) const
    {
        Vec2Int tilePos = getTilePos(worldPos);

        return TileView::getTileIndex(tilePos.x, tilePos.y);
    }

    int TileView::getTileIndex(const Rect2D &tile) const
    {
        return getTileIndex(tile.getCenterPosition2d());
    }


    Vec2Int TileView::getTilePos(int tileIndex) const
    {
        return Vec2Int(getColumn(tileIndex), getRow(tileIndex));
    }

    Rect2D &TileView::add(const Rect2D &rect, const Vec2Int &tilePos)
    {
        int tileIndex = m_TileBounds.getWidth() * tilePos.y + tilePos.x;

        Rect2D &newRect = m_Group.add(rect);
        m_TileIndexes[tileIndex] = &newRect;

        newRect.setTileIndex(tileIndex);

        return newRect;
    }

    void TileView::removeAt(int tileIndex)
    {
        Vec2Int tilePos = getTilePos(tileIndex);

        int index = m_TileBounds.getWidth() * tilePos.y + tilePos.x;

        Rect2D *rect = getAtTileIndex(tileIndex);

        if (rect)
        {
            m_TileIndexes[index] = nullptr;
            m_Group.remove(*rect);
        }
    }


    std::vector<Rect2D *> &TileView::getTiles()
    {
        return m_Group.getRenderables();
    }

    const std::vector<Rect2D *> &TileView::getTiles() const
    {
        return m_Group.getRenderables();
    }

    const Bounds &TileView::getBounds() const
    {
        return m_Bounds;
    }

    const BoundsInt &TileView::getTileBounds() const
    {
        return m_TileBounds;
    }

    unsigned int TileView::getColumn(int tileIndex) const
    {
        return tileIndex % m_TileBounds.getWidth();
    }

    unsigned int TileView::getRow(int tileIndex) const
    {
        return tileIndex / m_TileBounds.getWidth();
    }
} // namespace engine
} // namespace spright
