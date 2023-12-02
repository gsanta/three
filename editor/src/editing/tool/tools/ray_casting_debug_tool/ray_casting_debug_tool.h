#pragma once

#include "../../../../engine/graphics/mesh/meshes/line3d.h"
#include "../../../../engine/scene/cameras/arc_rotate_camera.h"
#include "../../../../engine/scene/cameras/ortho_projection_info.h"
#include "../../context/tool_context.h"
#include "../../tool.h"

namespace spright
{
namespace editing
{
    using namespace ::spright::engine;

    class RayCastingDebugTool : public Tool
    {
    public:
        RayCastingDebugTool();

    private:
        void pointerDown(const ToolContext &) override;

        void deactivate(const ToolContext &) override;

    private:
        float m_LineThickness = 0.1f;

        std::vector<Mesh *> m_Lines;
    };
} // namespace editing
} // namespace spright
