#pragma once

#include "../../../../engine/scene/cameras/arc_rotate_camera.h"
#include "../../../../engine/scene/cameras/ortho_projection_info.h"
#include "../../context/tool_context.h"
#include "../../tool.h"

namespace spright
{
namespace editing
{
    using namespace ::spright::engine;

    class CameraRotationTool : public Tool
    {
    public:
        CameraRotationTool();

    private:
        void pointerDown(const ToolContext &) override;

        void pointerMove(const ToolContext &) override;

    private:
        float m_Sensitivity = 0.1f;

        float m_StartYaw;

        float m_StartPitch;
    };
} // namespace editing
} // namespace spright
