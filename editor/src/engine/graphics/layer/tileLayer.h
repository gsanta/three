#pragma once

#include "../../../maths/mat4.h"
#include "../../../maths/vec2.h"
#include "../../../maths/vec2_int.h"
#include "../../layout/container.h"
#include "../camera/camera.h"
#include "../renderable/bounds.h"
#include "../renderable/bounds_int.h"
#include "../renderable/rect2d.h"
#include "./tile_view.h"
#include "group.h"

#include <math.h>
#include <string>

namespace spright
{
namespace engine
{
    using namespace ::spright::maths;

    class TileLayer : public TileView
    {
    public:
        const static float defaultTileSize;

    public:
        using TileView::getTileIndex;

        TileLayer(std::string name,
                  const Renderer2D &renderer,
                  Group<Rect2D> group,
                  Bounds bounds,
                  float tileSize = TileLayer::defaultTileSize,
                  float zPos = 0,
                  bool allowDuplicatedPixels = false);

        TileLayer(const TileLayer &tileLayer);

        TileLayer &operator=(const TileLayer &);

        friend bool operator==(const TileLayer &, const TileLayer &);

        friend bool operator!=(const TileLayer &, const TileLayer &);

        void setIndex(size_t index);

        size_t getIndex() const;

        std::string getName() const;

        void setEnabled(bool isEnabled);

        bool isEnabled();

        Rect2D &add(const Rect2D &rect);

        Rect2D &add(const Rect2D &rect, const Vec2Int &tilePos);

        void remove(const Rect2D &rect);

        void clear();

        void render(const Camera &camera);

        Vec2 getCenterPos(Vec2 pointer) const;

        Vec2 getCenterPos(int tileIndex) const;

        Vec2 getWorldPos(int tileIndex) const;

        Vec2 getWorldPos(const Vec2Int &tilePos) const;

        Vec2Int getTilePos(const Vec2 &pos) const;

        Vec2Int getTilePos(int tileIndex) const;

        unsigned int getColumn(int tileIndex) const;

        unsigned int getRow(int tileIndex) const;

        Vec2 getWorldPos(int x, int y);

        void translateTile(Rect2D *tile, const Vec2 &delta);

        void setTilePos(Rect2D *tile, const Vec2Int &newPos);

        Rect2D *getAtWorldPos(Vec2 pos) const;

        int getTileIndex(int tileX, int tileY) const
        {
            return TileView::getTileIndex(tileX, tileY);
        }

        int getTileIndex(Vec2 worldPos) const;

        bool containsTile(int x, int y) const;

        int getIndexSize() const;

        inline float getTileSize() const
        {
            return m_TileSize;
        }

        float getZPos() const;

        const Bounds &getBounds() const;

        nlohmann::json getJson() const;

        void setJson(std::string json);

        nlohmann::json getLayerDescription() const;

    private:
        void init();

        void copyGroup(const Group<Rect2D> &group);

        void updateTileIndex(Rect2D *rect, int newIndex);

    private:
        size_t m_Index = 0;

        std::string m_Name;

        Bounds m_Bounds;

        std::shared_ptr<Renderer2D> m_Renderer;

        float m_TileSize = 0.5f;

        bool m_IsEnabled = true;

        float m_ZPos;

        Mat4 m_Transformation;

        bool m_AllowDuplicatedPixels;
    };
} // namespace engine
} // namespace spright
