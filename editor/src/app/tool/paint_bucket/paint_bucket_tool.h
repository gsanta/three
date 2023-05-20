#pragma once

#include "../../../engine/graphics/camera/camera.h"
#include "../../document/document_store.h"
#include "../../service/services.h"
#include "../tool/tool.h"
#include "../tool/tool_context.h"
#include "queue_linear_flood_fill.h"

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;
    using namespace ::spright::maths;

    class PaintBucketTool : public Tool
    {
    public:
        PaintBucketTool();

        void pointerUp(const ToolContext &) override;

    private:
        QueueLinearFloodFill m_FloodFill;
    };
} // namespace editor
} // namespace spright
