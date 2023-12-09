#pragma once

#include "../../scene/cameras/camera.h"
#include "canvas.h"

namespace spright
{
namespace engine
{
    class Canvas2d : public Canvas
    {
    public:
        Canvas2d(const std::string &uuid, const Bounds &bounds, const Renderer2D &renderer);

        Canvas2d(const Canvas2d &canvas);

        Canvas2d &operator=(const Canvas2d &other);

        Canvas2d *clone() const override;

        void setCamera(const Camera &camera);

        Camera *getCamera() override;

        const std::string &getType() const override;

    private:
        std::unique_ptr<Camera> m_Camera;
    };
} // namespace engine
} // namespace spright
