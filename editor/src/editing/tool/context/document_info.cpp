#include "./document_info.h"

namespace spright
{
namespace editing
{
    bool DocumentInfo::hasActiveDrawing() const
    {
        return activeDrawing != nullptr;
    }

    bool DocumentInfo::hasPrevDrawing() const
    {
        return prevDrawing != nullptr;
    }

    bool DocumentInfo::isLeavingDrawing() const
    {
        return prevDrawing != nullptr && m_IsActiveDrawingChanging;
    }

    void DocumentInfo::setActiveDocumentChanging(bool isChanging)
    {
        m_IsActiveDrawingChanging = isChanging;
    }

    void DocumentInfo::setActiveDrawing(TileCanvas *newActiveDrawing)
    {
        prevDrawing = activeDrawing;
        activeDrawing = newActiveDrawing;
        m_IsActiveDrawingChanging = true;
    }

} // namespace editing
} // namespace spright
