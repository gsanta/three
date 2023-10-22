#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../context/tool_context.h"

namespace spright
{
namespace editor
{
    class Cursor
    {
    public:
        Cursor(bool shouldDisableOnDrag = false);

        virtual void update(ToolContext &context);

        virtual void destroy(ToolContext &context);

        void setDisabled(ToolContext &context);

        void setEnabled(ToolContext &context);

        bool isEnabled() const;

        bool shouldDisableOnDrag() const;

    private:
        bool m_IsEnabled = true;

        bool m_DisableOnDrag = false;
    };
} // namespace editor
} // namespace spright
