#pragma once

#include "../../../../engine/scene/cameras/camera.h"
#include "../../../../engine/scene/cameras/ortho_projection_info.h"
#include "../../../document/document_store.h"
#include "../../context/tool_context.h"
#include "../../tool.h"

namespace spright
{
namespace editing
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
} // namespace editing
} // namespace spright
