#pragma once

#include "../../engine/graphics/camera/camera.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "../document/document_store.h"
#include "tool/tool.h"
#include "tool/tool_context.h"

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class ZoomTool : public Tool
    {
    private:
        DocumentStore *m_DocumentStore;
        float m_ZoomFactor = 1.0f;

    public:
        ZoomTool(DocumentStore *documentStore);

    private:
        void scroll(ToolContext &toolContext) override;
    };
} // namespace editor
} // namespace spright
