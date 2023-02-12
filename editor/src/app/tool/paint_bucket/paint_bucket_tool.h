#pragma once

#include "../tool.h"
#include "../../document/document_handler.h"
#include "../../../engine/graphics/camera/camera.h"
#include "queue_linear_flood_fill.h"
#include "../../service/services.h"

namespace spright { namespace editor {
    using namespace ::spright::engine;
    using namespace ::spright::maths;

    class PaintBucketTool : public Tool
    {
    private:
        DocumentHandler* m_DocumentHandler;
        QueueLinearFloodFill m_FloodFill;
        Services* m_Services;

    public:
        PaintBucketTool(DocumentHandler* m_DocumentHandler, Services* services);
        void pointerUp(PointerInfo& pointerInfo) override;
    };
}}
