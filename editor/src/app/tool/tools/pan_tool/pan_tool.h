#pragma once

#include "../../../../engine/graphics/camera/ortho_projection_info.h"
#include "../../context/tool_context.h"
#include "../../tool.h"

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class PanTool : public Tool
    {
    public:
        PanTool(DocumentStore *documentStore);

    private:
        void pointerMove(const ToolContext &) override;

    private:
        DocumentStore *m_DocumentStore;

        float m_ZoomFactor = 1.0f;
    };
} // namespace editor
} // namespace spright
