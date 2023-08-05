#pragma once
#include "../../../engine/graphics/layer/tileLayer.h"

namespace spright
{
namespace editor
{
    using namespace engine;

    class EraserStroke
    {
    public:
        EraserStroke();

        EraserStroke(int eraserSize);

        void draw(TileLayer &drawLayer, const Vec2 &pos);

        void clear(TileLayer &drawLayer);

        float getStrokeWidth();

    private:
        void init(TileLayer &drawLayer, float tileSize);

        void setPosition(TileLayer &drawLayer, const Vec2 &pos);

    private:
        int m_Size;

        float m_StrokeWidth = 0.1f;

        Rect2D *m_TopLine = nullptr;

        Rect2D *m_RightLine = nullptr;

        Rect2D *m_BottomLine = nullptr;

        Rect2D *m_LeftLine = nullptr;
    };
} // namespace editor
} // namespace spright
