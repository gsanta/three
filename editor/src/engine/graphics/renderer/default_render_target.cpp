#include "default_render_target.h"

namespace spright { namespace engine {

	void DefaultRenderTarget::enable() {
		glBindFramebuffer(GL_FRAMEBUFFER, 0);
		glClearColor(0.1f, 0.1f, 0.1f, 1.0f);
		glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
		glEnable(GL_DEPTH_TEST);
	}

	void DefaultRenderTarget::disable()
	{
	}
}}