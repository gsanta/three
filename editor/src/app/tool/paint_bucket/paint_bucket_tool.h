#pragma once

#include "../tool.h"
#include "../../../engine/graphics/camera/camera.h"
#include "queue_linear_flood_fill.h"
#include "../../service/services.h"
#include "../../document/document_store.h"

namespace spright { namespace editor {
    using namespace ::spright::engine;
    using namespace ::spright::maths;

    class PaintBucketTool : public Tool
    {
    private:
        DocumentStore* m_DocumentStore;
        QueueLinearFloodFill m_FloodFill;
        Services* m_Services;

    public:
        PaintBucketTool(DocumentStore* documentStore, Services* services);
        void pointerUp(PointerInfo& pointerInfo) override;
    };
}}
