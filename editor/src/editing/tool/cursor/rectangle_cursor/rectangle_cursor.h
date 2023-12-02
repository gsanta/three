#pragma once

#include "../../../../engine/scene/containers/tile_layer.h"
#include "../../cursor/cursor.h"

namespace spright
{
namespace editing
{
    class RectangleCursor : public Cursor
    {
    public:
        RectangleCursor(int rectangleSize, bool shouldDisableOnDrag = false);

        void update(ToolContext &context) override;

        virtual void destroy(ToolContext &context) override;

        void setSize(int size);

    private:
        void setPosition(ToolContext &context);

    private:
        int m_Size;

        Rect2D *m_Rect = nullptr;
    };
} // namespace editing
} // namespace spright
