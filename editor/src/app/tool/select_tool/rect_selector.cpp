#include "./rect_selector.h"

namespace spright
{
namespace editor
{
    RectSelector::RectSelector(TileLayer *tileLayer) : m_Layer(tileLayer)
    {
    }

    void RectSelector::setSelection(const Vec2 &pos1, const Vec2 &pos2)
    {
        if (Vec2::distance(pos1, pos2) < m_PointSelectionTolerance)
        {
            makePointSelection(pos1);
        }
        else
        {
            makeRectSelection(pos1, pos2);
        }
    }

    void RectSelector::moveSelectionWith(const Vec2 &delta)
    {
        for (int i = 0; i < m_Sprites.size(); i++)
        {
            Rect2D *sprite = m_Sprites[i];
            m_Layer->translateTile(sprite, delta);
        }
    }

    const std::vector<Rect2D *> RectSelector::getSelection() const
    {
        return m_Sprites;
    }

    void RectSelector::reset(TileLayer *layer)
    {
        m_Sprites.clear();
        m_OrigPositions.clear();
        m_Layer = layer;
    }

    void RectSelector::makeRectSelection(const Vec2 &pos1, const Vec2 &pos2)
    {
        m_Sprites.clear();
        m_OrigPositions.clear();

        float startX = pos1.x < pos2.x ? pos1.x : pos2.x;
        float endX = pos1.x < pos2.x ? pos2.x : pos1.x;
        float startY = pos1.y < pos2.y ? pos1.y : pos2.y;
        float endY = pos1.y < pos2.y ? pos2.y : pos1.y;

        Bounds selectionBounds = Bounds::createWithPositions(startX, startY, endX, endY);

        auto it = m_Layer->getTiles().begin();
        while (it != m_Layer->getTiles().end())
        {
            Vec2 pos = (*it)->getCenterPosition2d();

            if (selectionBounds.contains(pos.x, pos.y))
            {
                Rect2D *sprite = *it;
                m_Sprites.push_back(sprite);
                m_OrigPositions.push_back(Vec2(sprite->getPosition().x, sprite->getPosition().y));
            }
            ++it;
        }
    }

    void RectSelector::makePointSelection(const Vec2 &pos)
    {
        Vec2Int tilePos = m_Layer->getTilePos(pos);
        int tileIndex = m_Layer->getTileIndex(tilePos.x, tilePos.y);
        Renderable2D *renderable = m_Layer->getAtTileIndex(tileIndex);

        if (renderable != nullptr)
        {
            Rect2D *sprite = static_cast<Rect2D *>(renderable);
            m_Sprites.push_back(sprite);
            m_OrigPositions.push_back(Vec2(sprite->getPosition().x, sprite->getPosition().y));
        }
    }
} // namespace editor
} // namespace spright
