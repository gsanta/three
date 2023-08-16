#pragma once

#include "../../../../engine/graphics/layer/tileLayer.h"
#include "../../cursor/cursor.h"
#include "./rectangle_stroke.h"

namespace spright
{
namespace editor
{
    class RectangleCursor : public Cursor
    {
    public:
        RectangleCursor(int rectangleSize, bool shouldDisableOnDrag = false);

        void update(TileLayer &foregroundLayer, const PointerInfo &pointerInfo);

        virtual void destroy(TileLayer &foregroundLayer);

        RectangleStroke &getRectangleStroke();

    private:
        RectangleStroke m_RectangleStroke;
    };
} // namespace editor
} // namespace spright
