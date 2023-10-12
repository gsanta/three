#pragma once

#include "../../../../engine/graphics/camera/camera.h"
#include "../../../../engine/graphics/camera/ortho_projection_info.h"
#include "../../../document/document_store.h"
#include "../../context/tool_context.h"
#include "../../tool.h"

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class ZoomTool : public Tool
    {
    private:
        DocumentStore *m_DocumentStore;
        float m_ZoomFactor = 0.01f;

    public:
        ZoomTool(DocumentStore *documentStore);

    private:
        void scroll(const ToolContext &toolContext) override;
    };
} // namespace editor
} // namespace spright
