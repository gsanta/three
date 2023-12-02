#pragma once

#include "../../../../engine/scene/cameras/camera.h"
#include "../../../document/document_store.h"
#include "../../../history/document_history.h"
#include "../../../history/tile_undo.h"
#include "../../context/tool_context.h"
#include "../../tool.h"
#include "queue_linear_flood_fill.h"

namespace spright
{
namespace editing
{
    using namespace ::spright::engine;
    using namespace ::spright::maths;

    class PaintBucketTool : public Tool
    {
    public:
        PaintBucketTool();

        void pointerUp(ToolContext &) override;

    private:
        QueueLinearFloodFill m_FloodFill;
    };
} // namespace editing
} // namespace spright
