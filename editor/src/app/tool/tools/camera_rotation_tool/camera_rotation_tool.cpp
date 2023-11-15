#include "camera_rotation_tool.h"

namespace spright
{
namespace editor
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

            std::cout << offset << std::endl;

            camera3d->setYaw(m_StartYaw + offset.x);
            camera3d->setPitch(m_StartPitch + offset.y);
        }
    }
} // namespace editor
} // namespace spright
