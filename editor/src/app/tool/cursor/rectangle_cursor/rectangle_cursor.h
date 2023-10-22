#pragma once

#include "../../../../engine/graphics/layer/tileLayer.h"
#include "../../cursor/cursor.h"

namespace spright
{
namespace editor
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
} // namespace editor
} // namespace spright
