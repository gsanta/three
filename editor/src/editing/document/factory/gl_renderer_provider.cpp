#include "gl_renderer_provider.h"

namespace spright
{
namespace editing
{
    std::unique_ptr<Renderer2D> GLRendererProvider::createRenderer2D() const
    {
#ifdef SPARKY_EMSCRIPTEN
        GLShader shaderUnlit("emscripten/resources/shaders/basic.es3.vert",
                             "emscripten/resources/shaders/basic_unlit.es3.frag");
#else
        GLShader shaderUnlit("shaders/basic.vert", "shaders/unlit.frag");
#endif
        return std::make_unique<GLRenderer2D>(shaderUnlit);
    }

    GLRendererProvider *GLRendererProvider::clone() const
    {
        return new GLRendererProvider();
    }
} // namespace editing
} // namespace spright
