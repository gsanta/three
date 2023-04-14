#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/renderable/bounds.h"
#include "../../../engine/graphics/renderable/rect2d.h"

#include <vector>

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class SelectionBox
    {
    private:
        TileLayer *m_Layer;

        float m_DashSize = 0.2f;
        Vec2 m_AbsoluteDelta;
        Vec2 m_PrevTranslate;

        Vec2 m_Start;

        Bounds m_Bounds;

    public:
        SelectionBox();
        ~SelectionBox();

        void setTileLayer(TileLayer &tileLayer);
        void start(Vec2 pos);
        void setPosition(Vec2 pos);
        Vec2 move(Vec2 delta);
        void clear();
        bool isInsideSelection(Vec2 point);
        Bounds getBounds();

    private:
        void calcSelectionBounds(Vec2 vec1, Vec2 vec2);
        void clearSprites();
    };
} // namespace editor
} // namespace spright
