#pragma once

#include "../../../../engine/graphics/camera/arc_rotate_camera.h"
#include "../../../../engine/graphics/camera/ortho_projection_info.h"
#include "../../context/tool_context.h"
#include "../../tool.h"

namespace spright
{
namespace editor
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
} // namespace editor
} // namespace spright
