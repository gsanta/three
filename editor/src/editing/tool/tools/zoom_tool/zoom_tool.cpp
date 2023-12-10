#include "zoom_tool.h"

namespace spright
{
namespace editing
{
    ZoomTool::ZoomTool() : PixelTool("zoom")
    {
    }

    void ZoomTool::scroll(const ToolContext &context)
    {
        if (context.pointer.scroll.y > 0)
        {
            context.doc.document->getBackgroundCanvas().getCamera()->zoomIn();
        }
        else
        {
            context.doc.document->getBackgroundCanvas().getCamera()->zoomOut();
        }
    }
} // namespace editing
} // namespace spright
