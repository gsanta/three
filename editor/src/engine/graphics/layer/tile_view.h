/*
 * A basic implementation of TileView, which can be used for temporary storage of tiles (like shearing algorithm
 * which needs to copy tiles to a temporary place and then back to the original TileLayer)
 */

#pragma once

#include "../renderable/bounds.h"
#include "../renderable/bounds_int.h"
#include "../renderable/rect2d.h"
#include "group.h"

#include <math.h>


namespace spright
{
namespace engine
{
    class TileView
    {
    public:
        TileView(const Bounds &bounds, float tileSize);

        TileView(const TileView &TileView);

        ~TileView();

        TileView &operator=(const TileView &that);

        Vec2 getCenterPos(const Vec2 &pointer) const;

        Vec2 getCenterPos(int tileIndex) const;

        Vec2 getCenterPos(const Vec2Int &tilePos) const;

        Vec2 getBottomLeftPos(int tileIndex) const;

        Vec2 getBottomLeftPos(const Vec2 &worldPos) const;

        Vec2 getBottomLeftPos(const Vec2Int &tilePos) const;


        Vec2Int getTilePos(const Vec2 &pos) const;

        Rect2D *getAtTilePos(int x, int y) const;

        Rect2D *getAtTileIndex(int tilePos) const;

        Vec2Int getTilePos(int tileIndex) const;

        Rect2D &add(const Rect2D &rect, const Vec2Int &tilePos);

        void removeAt(int tilePos);

        const Bounds &getBounds() const;

        const BoundsInt &getTileBounds() const;

        inline float getTileSize() const
        {
            return m_TileSize;
        }

        unsigned int getColumn(int tileIndex) const;

        unsigned int getRow(int tileIndex) const;

        int getTileIndex(int tileX, int tileY) const;

        int getTileIndex(Vec2 worldPos) const;

        std::vector<Rect2D *> &getTiles();

        const std::vector<Rect2D *> &getTiles() const;

    protected:
        Group<Rect2D> m_Group;

        float m_TileSize;

        Bounds m_Bounds;

        BoundsInt m_TileBounds;

        int m_IndexSize;

        Renderable2D **m_TileIndexes;
    };
} // namespace engine
} // namespace spright
