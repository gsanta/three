#pragma once

#include "../../../../engine/graphics/layer/tile_layer.h"
#include "../../../../engine/graphics/renderable/rect2d.h"
#include "../../../../maths/vec2.h"

namespace spright
{
namespace editor
{
    using namespace engine;
    using namespace maths;

    class TempRectDrawer
    {
    public:
        void drawFilled(TileLayer &tileLayer, Vec2 from, Vec2 to, int color);

        void drawOutlined(TileLayer &tileLayer, Vec2 from, Vec2 to, int color);

        void reset();

        const Bounds &getBounds() const;

    private:
        Rect2D *m_Filled = nullptr;

        Rect2D *m_OutlinedTop = nullptr;

        Rect2D *m_OutlinedRight = nullptr;

        Rect2D *m_OutlinedBottom = nullptr;

        Rect2D *m_OutlinedLeft = nullptr;

        Bounds m_Bounds;
    };
} // namespace editor
} // namespace spright
