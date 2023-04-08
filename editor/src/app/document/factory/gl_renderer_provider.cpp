#include "gl_renderer_provider.h"

namespace spright { namespace editor {
	GLRenderer2D* GLRendererProvider::createRenderer2D() const {
#ifdef SPARKY_EMSCRIPTEN
		GLShader shaderUnlit("resources/shaders/basic.es3.vert", "resources/shaders/basic_unlit.es3.frag");
#else
		GLShader shaderUnlit("shaders/basic.vert", "shaders/unlit.frag");
#endif

		return new GLRenderer2D(shaderUnlit);
	}

	GLRendererProvider* GLRendererProvider::clone() const {
		return new GLRendererProvider();
	}
}}