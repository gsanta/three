#include "camera_rotation_tool.h"

namespace spright
{
namespace editing
{
    CameraRotationTool::CameraRotationTool() : Tool("camera_rotation")
    {
    }

    void CameraRotationTool::pointerDown(const ToolContext &context)
    {
        Camera *camera = context.doc.document->getBackgroundCanvas().getCamera();
        ArcRotateCamera *camera3d = dynamic_cast<ArcRotateCamera *>(camera);

        m_StartYaw = camera3d->getYaw();
        m_StartPitch = camera3d->getPitch();
    }


    void CameraRotationTool::pointerMove(const ToolContext &context)
    {
        if (context.pointer.isDown)
        {
            Camera *camera = context.doc.document->getBackgroundCanvas().getCamera();
            ArcRotateCamera *camera3d = dynamic_cast<ArcRotateCamera *>(camera);

            Vec2 offset = context.pointer.downDelta() * m_Sensitivity;

            camera3d->setYaw(m_StartYaw + offset.x);
            camera3d->setPitch(m_StartPitch + offset.y);
        }
        else
        {
            Camera *camera = context.doc.document->getBackgroundCanvas().getCamera();
            ArcRotateCamera *camera3d = dynamic_cast<ArcRotateCamera *>(camera);
            camera3d->screenToWorldPos3d(context.pointer.curr.x, context.pointer.curr.y, 0);
        }
    }
} // namespace editing
} // namespace spright
