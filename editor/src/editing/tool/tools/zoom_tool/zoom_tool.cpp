#include "zoom_tool.h"

namespace spright
{
namespace editing
{
    ZoomTool::ZoomTool(DocumentStore *documentStore) : m_DocumentStore(documentStore), Tool("zoom")
    {
    }

    void ZoomTool::scroll(const ToolContext &context)
    {
        if (context.pointer.scroll.y > 0)
        {
            m_DocumentStore->getActiveDocument().getBackgroundCanvas().getCamera()->zoomIn();
        }
        else
        {
            m_DocumentStore->getActiveDocument().getBackgroundCanvas().getCamera()->zoomOut();
        }
    }
} // namespace editing
} // namespace spright
