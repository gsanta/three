/*
 * A basic implementation of TileView, which can be used for temporary storage of tiles (like shearing algorithm
 * which needs to copy tiles to a temporary place and then back to the original TileLayer)
 */

#pragma once

#include "../renderable/bounds_int.h"
#include "../renderable/rect2d.h"
#include "group.h"

namespace spright
{
namespace engine
{
    class TileView
    {
    public:
        TileView(const BoundsInt &tileBounds);

        TileView(const TileView &TileView);

        ~TileView();

        TileView &operator=(const TileView &that);

        Rect2D *getAtTilePos(int x, int y) const;

        Rect2D *getAtTileIndex(int tilePos) const;

        Rect2D &add(const Rect2D &rect, const Vec2Int &tilePos);

        const BoundsInt &getTileBounds() const;

        int getTileIndex(int tileX, int tileY) const;

        std::vector<Rect2D *> &getTiles();

        const std::vector<Rect2D *> &getTiles() const;

    protected:
        Group<Rect2D> m_Group;

        BoundsInt m_TileBounds;

        int m_IndexSize;

        Renderable2D **m_TileIndexes;
    };
} // namespace engine
} // namespace spright
