#pragma once

#include "../../graphics/mesh/meshes/mesh.h"
#include "../../scene/cameras/arc_rotate_camera.h"
#include "../containers/group.h"
#include "canvas.h"

namespace spright
{
namespace engine
{
    class Canvas3d : public Canvas
    {
    public:
        Canvas3d(const std::string &uuid, const Bounds &bounds, const Renderer2D &renderer);

        Canvas3d(const Canvas3d &drawing);

        ~Canvas3d() override = default;

        Canvas3d &operator=(const Canvas3d &other);

        Mesh &add(const Mesh &renderable);

        Group<Mesh> &getGroup();

        Group<Mesh> &getGizmoGroup();

        Canvas3d *clone() const override;

        void render(const Camera &camera, Canvas::RenderTarget target) override;

        void setCamera(const ArcRotateCamera &camera);

        ArcRotateCamera *getCamera() override;

    private:
        std::unique_ptr<ArcRotateCamera> m_Camera;

        Group<Mesh> m_Group;

        Group<Mesh> m_GizmoGroup;
    };
} // namespace engine
} // namespace spright
