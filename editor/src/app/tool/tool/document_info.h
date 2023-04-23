#pragma once
#include "../../document/document_store.h"
#include "../../document/drawing.h"

namespace spright
{
namespace editor
{
    struct DocumentInfo
    {
        Drawing *prevDrawing = nullptr;

        Drawing *activeDrawing = nullptr;

        bool hasActiveDrawing() const;

        bool hasPrevDrawing() const;

        bool isLeavingDrawing() const;

        void setActiveDocumentChanging(bool isChanging);

        void setActiveDrawing(Drawing *activeDrawing);

    private:
        bool m_IsActiveDrawingChanging;
    };
} // namespace editor
} // namespace spright
