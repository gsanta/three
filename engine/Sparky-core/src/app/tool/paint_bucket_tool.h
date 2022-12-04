#pragma once

#include "tool.h"
#include "../document/document_handler.h"

namespace spright_app {
    class PaintBucketTool : public tool::Tool
    {
    private:
        document::DocumentHandler *m_DocumentHandler;

    public:
        //void pointerUp(PointerInfo &pointerInfo) override;
    };
}
