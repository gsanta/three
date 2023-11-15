#pragma once
#include "../graphics/layer/layer.h"
#include "../graphics/renderable/bounds.h"

namespace spright
{
namespace engine
{
    class Canvas
    {
    public:
        enum RenderTarget
        {
            Screen,
            Image
        };

        Canvas(const std::string &uuid, const Bounds &bounds, const Renderer2D &renderer);

        Canvas(const Canvas &other);

        Canvas &operator=(const Canvas &other);

        const Bounds &getBounds() const;

        const std::string getUuid() const;

        virtual Canvas *clone() const;

        virtual void render(const Camera &camera, Canvas::RenderTarget target);

        Renderer2D &getRenderer();

        Layer &getDecorationLayer();

        void setCamera(const Camera &camera);

        Camera *getCamera();

    private:
        std::unique_ptr<Camera> m_Camera;

        Bounds m_Bounds;

        Layer m_DecorationLayer;

        std::string m_Uuid;

        std::unique_ptr<Renderer2D> m_Renderer;
    };
} // namespace engine
} // namespace spright
