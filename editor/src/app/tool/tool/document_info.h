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
        bool isLeavingDrawing = false;

        bool hasActiveDrawing();
        bool hasPrevDrawing();
    };
} // namespace editor
} // namespace spright
