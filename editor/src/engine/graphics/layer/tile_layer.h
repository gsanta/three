#pragma once

#include "../../../maths/mat4.h"
#include "../../../maths/vec2.h"
#include "../../../maths/vec2_int.h"
#include "../../structure/canvas.h"
#include "../camera/camera.h"
#include "../renderable/bounds.h"
#include "../renderable/bounds_int.h"
#include "../renderable/rect2d.h"
#include "./tile_view.h"
#include "group.h"

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
        using TileView::getBottomLeftPos;

        TileLayer(std::string name,
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

        void render(const Mat4 &proj, const Mat4 &view, Renderer2D &renderer);

        void translateTile(Rect2D *tile, const Vec2 &delta);

        void setTilePos(Rect2D *tile, const Vec2Int &newPos);

        Rect2D *getAtWorldPos(Vec2 pos) const;

        bool containsTile(int x, int y) const;

        int getIndexSize() const;

        float getZPos() const;

        nlohmann::json getJson() const;

        void setJson(std::string json);

        nlohmann::json getLayerDescription() const;

        int updateTileIndex(Rect2D *rect);

    private:
        void copyGroup(const Group<Rect2D> &group);

    private:
        size_t m_Index = 0;

        std::string m_Name;

        bool m_IsEnabled = true;

        float m_ZPos;

        Mat4 m_Transformation;

        bool m_AllowDuplicatedPixels;
    };
} // namespace engine
} // namespace spright
