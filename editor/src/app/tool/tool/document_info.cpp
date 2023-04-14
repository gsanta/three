#include "./document_info.h"

namespace spright
{
namespace editor
{
    bool DocumentInfo::hasActiveDrawing()
    {
        return activeDrawing != nullptr;
    }

    bool DocumentInfo::hasPrevDrawing()
    {
        return prevDrawing != nullptr;
    }
} // namespace editor
} // namespace spright
