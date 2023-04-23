#pragma once

#include "../../../maths/mat4.h"
#include "../../../maths/vec2.h"
#include "../../../maths/vec2_int.h"
#include "../../layout/container.h"
#include "../camera/camera.h"
#include "../renderable/bounds.h"
#include "../renderable/bounds_int.h"
#include "../renderable/rect2d.h"
#include "group.h"

#include <math.h>
#include <string>

namespace spright
{
namespace engine
{
    using namespace ::spright::maths;

    class TileLayer
    {
    public:
        const static float defaultTileSize;

    public:
        TileLayer(std::string name,
                  Group<Rect2D> group,
                  Bounds bounds,
                  float tileSize = TileLayer::defaultTileSize,
                  float zPos = 0);

        TileLayer(const TileLayer &tileLayer);

        ~TileLayer();

        TileLayer &operator=(const TileLayer &);

        friend bool operator==(const TileLayer &, const TileLayer &);

        friend bool operator!=(const TileLayer &, const TileLayer &);

        void setIndex(size_t index);

        size_t getIndex() const;

        std::string getName() const;

        void setEnabled(bool isEnabled);

        bool isEnabled();

        Rect2D &add(const Rect2D &rect);

        void remove(const Rect2D &rect);

        void clear();

        void render(const Camera &camera);

        std::vector<Rect2D *> &getRenderables();

        // TODO: find a better name
        Vec2 getBottomLeftPos(Vec2 pointer) const;

        Vec2 getBottomLeftPos(int tileIndex) const;

        Vec2 getWorldPos(int tileIndex) const;

        Vec2 getWorldPos(const Vec2Int tilePos) const;

        Vec2Int getTilePos(Vec2 pos) const;

        Vec2Int getTilePos(int tileIndex) const;

        unsigned int getColumn(int tileIndex) const;

        unsigned int getRow(int tileIndex) const;

        Vec2 getWorldPos(int x, int y);

        void translateTile(Rect2D *rect, const Vec2 &delta);

        Rect2D *getAtTileIndex(int tileIndex) const;

        Rect2D *getAtTilePos(int x, int y) const;

        int getTileIndex(int tileX, int tileY) const;

        int getTileIndex(Vec2 worldPos) const;

        const BoundsInt &getTileBounds() const;

        int getIndexSize() const;

        inline float getTileSize() const
        {
            return m_TileSize;
        }

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

        Group<Rect2D> m_Group;

        float m_TileSize = 0.5f;

        int m_IndexSize;

        bool m_IsEnabled = true;

        Renderable2D **m_TileIndexes;

        BoundsInt m_TileBounds;

        float m_ZPos;

        Mat4 m_Transformation;
    };
} // namespace engine
} // namespace spright
