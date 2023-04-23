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
    public:
        SelectionBox(TileLayer *tileLayer);

        SelectionBox() = default;

        ~SelectionBox();

        void setSelectionStart(Vec2 pos);

        void setSelectionEnd(Vec2 pos);

        void setMoveStart(Vec2 delta);

        Vec2 setMoveEnd(Vec2 delta);

        bool isInsideSelection(Vec2 point);

        Bounds getBounds();

        TileLayer *getTileLayer();

        void clear();

        void reset(TileLayer *layer);

    private:
        void calcSelectionBounds(Vec2 vec1, Vec2 vec2);

        void clearSprites();

    private:
        TileLayer *m_Layer = nullptr;

        float m_DashSize = 0.2f;

        Vec2 m_AbsoluteDelta;

        Vec2 m_PrevTranslate;

        Vec2 m_SelectioinStart;

        Vec2 m_MoveStart;

        Vec2 m_MovePrev;

        bool m_IsMoveStarted = false;

        Bounds m_Bounds;
    };
} // namespace editor
} // namespace spright
