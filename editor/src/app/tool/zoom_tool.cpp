#include "zoom_tool.h"

namespace spright
{
namespace editor
{
    ZoomTool::ZoomTool(DocumentStore *documentStore) : m_DocumentStore(documentStore), Tool("zoom")
    {
    }

    void ZoomTool::scroll(ToolContext &context)
    {
        m_DocumentStore->getActiveDocument().getCamera().zoom(context.pointer.scroll.y > 0 ? -m_ZoomFactor
                                                                                           : m_ZoomFactor);
    }
} // namespace editor
} // namespace spright
