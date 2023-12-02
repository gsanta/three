#include "pan_tool.h"

namespace spright
{
namespace editing
{
    PanTool::PanTool() : Tool("pan")
    {
    }

    void PanTool::pointerMove(const ToolContext &context)
    {
        if (context.pointer.isDown)
        {
            Camera *camera = context.doc.document->getBackgroundCanvas().getCamera();
            Camera2d *camera2d = dynamic_cast<Camera2d *>(camera);

            camera2d->translate2D(context.pointer.prev - context.pointer.curr);
        }
    }
} // namespace editing
} // namespace spright
