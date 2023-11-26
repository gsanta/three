#include "ray_casting_debug_tool.h"

namespace spright
{
namespace editor
{
    RayCastingDebugTool::RayCastingDebugTool() : Tool("ray_casting_debug")
    {
    }

    void RayCastingDebugTool::pointerDown(const ToolContext &context)
    {
        Camera *camera = context.doc.document->getBackgroundCanvas().getCamera();
        ArcRotateCamera *camera3d = dynamic_cast<ArcRotateCamera *>(camera);

        Vec3 pos = camera3d->screenToWorldPos3d(context.pointer.curr.x, context.pointer.curr.y, 0);
        Vec3 pos2 = camera3d->screenToWorldPos3d(context.pointer.curr.x, context.pointer.curr.y, -100);

        std::vector<std::unique_ptr<Canvas>> &canvases = context.doc.document->getCanvases();
        Drawing3d *drawing = dynamic_cast<Drawing3d *>(canvases[0].get());

        Mesh &line = drawing->getGroup().add(Line3d(pos, pos2, m_LineThickness, COLOR_GREEN));

        m_Lines.push_back(&line);
    }

    void RayCastingDebugTool::deactivate(const ToolContext &context)
    {
        std::vector<std::unique_ptr<Canvas>> &canvases = context.doc.document->getCanvases();
        Drawing3d *drawing = dynamic_cast<Drawing3d *>(canvases[0].get());

        for (Mesh *line : m_Lines)
        {
            drawing->getGroup().remove(*line);
        }
    }
} // namespace editor
} // namespace spright
