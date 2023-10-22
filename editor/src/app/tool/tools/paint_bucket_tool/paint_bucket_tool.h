#pragma once

#include "../../../../engine/graphics/camera/camera.h"
#include "../../../core/history/document_history.h"
#include "../../../core/history/tile_undo.h"
#include "../../../document/document_store.h"
#include "../../../service/services.h"
#include "../../context/tool_context.h"
#include "../../tool.h"
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

        void pointerUp( ToolContext &) override;

    private:
        QueueLinearFloodFill m_FloodFill;
    };
} // namespace editor
} // namespace spright
