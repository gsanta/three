#pragma once
#include "../../../engine/scene/canvas/tile_canvas.h"
#include "../../document/document_store.h"

namespace spright
{
namespace editing
{
    struct DocumentInfo
    {
        TileCanvas *prevDrawing = nullptr;

        TileCanvas *activeDrawing = nullptr;

        Document *document = nullptr;

        bool hasActiveDrawing() const;

        bool hasPrevDrawing() const;

        bool isLeavingDrawing() const;

        void setActiveDocumentChanging(bool isChanging);

        void setActiveDrawing(TileCanvas *activeDrawing);

    private:
        bool m_IsActiveDrawingChanging;
    };
} // namespace editing
} // namespace spright
