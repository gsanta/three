#pragma once

#include "../../../maths/data/bounds.h"
#include "../containers/layer.h"

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

        virtual ~Canvas() = default;

        Canvas(const std::string &uuid, const Bounds &bounds, const Renderer2D &renderer);

        Canvas(const Canvas &other);

        Canvas &operator=(const Canvas &other);

        const Bounds &getBounds() const;

        const std::string getUuid() const;

        virtual void render(const Camera &camera, Canvas::RenderTarget target);

        Renderer2D &getRenderer();

        Layer &getDecorationLayer();

        virtual Canvas *clone() const = 0;

        virtual Camera *getCamera() = 0;

    protected:
        Bounds m_Bounds;

        Layer m_DecorationLayer;

        std::string m_Uuid;

        std::unique_ptr<Renderer2D> m_Renderer;
    };
} // namespace engine
} // namespace spright
