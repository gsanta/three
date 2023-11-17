#include "mesh_creation_tool.h"

namespace spright
{
namespace editor
{

    MeshCreationTool::MeshCreationTool() : Tool("mesh_creation")
    {
        // m_MeshBuilders.push_back(&m_BoxBuilder);
    }

    void MeshCreationTool::pointerUp(ToolContext &context)
    {
        Camera *camera = context.doc.document->getBackgroundCanvas().getCamera();
        ArcRotateCamera *camera3d = dynamic_cast<ArcRotateCamera *>(camera);

        Vec3 pos = camera3d->screenToWorldPos3d(context.pointer.curr.x, context.pointer.curr.y, 0);

        Drawing3d *drawing = context.doc.document->getActiveDrawing3d();

        drawing->add(m_BoxBuilder.build(pos));
    }
} // namespace editor
} // namespace spright
