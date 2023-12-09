#include "ray_casting_debug_tool.h"

namespace spright
{
namespace editing
{
    RayCastingDebugTool::RayCastingDebugTool() : PixelTool("ray_casting_debug")
    {
    }

    void RayCastingDebugTool::pointerDown(const ToolContext &context)
    {
        Camera *camera = context.doc.document->getBackgroundCanvas().getCamera();
        ArcRotateCamera *camera3d = dynamic_cast<ArcRotateCamera *>(camera);

        Vec3 pos = camera3d->screenToWorldPos3d(context.pointer.curr.x, context.pointer.curr.y, 0);
        Vec3 pos2 = camera3d->screenToWorldPos3d(context.pointer.curr.x, context.pointer.curr.y, -100);

        Canvas *canvas = context.doc.document->getCanvas(0);
        Canvas3d *drawing = dynamic_cast<Canvas3d *>(canvas);

        Mesh &line = drawing->getGroup().add(Line3d(pos, pos2, m_LineThickness, COLOR_GREEN));

        m_Lines.push_back(&line);
    }

    void RayCastingDebugTool::deactivate(const ToolContext &context)
    {
        Canvas *canvas = context.doc.document->getCanvas(0);
        Canvas3d *drawing = dynamic_cast<Canvas3d *>(canvas);

        for (Mesh *line : m_Lines)
        {
            drawing->getGroup().remove(*line);
        }
    }
} // namespace editing
} // namespace spright
