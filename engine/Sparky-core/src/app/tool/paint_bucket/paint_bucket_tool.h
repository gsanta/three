#pragma once

#include "../tool.h"
#include "../../document/document_handler.h"
#include "../../../engine/graphics/camera/camera.h"
#include "queue_linear_flood_fill.h"

namespace spright_app {
    using namespace spright_engine::graphics;

    class PaintBucketTool : public tool::Tool
    {
    private:
        document::DocumentHandler *m_DocumentHandler;
        QueueLinearFloodFill m_FloodFill;

    public:
        PaintBucketTool(document::DocumentHandler* m_DocumentHandler);
        void pointerUp(tool::PointerInfo &pointerInfo) override;
    };
}
