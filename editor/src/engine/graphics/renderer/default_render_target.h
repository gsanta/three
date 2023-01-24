#pragma once
#include <GL/glew.h>
#include "render_target.h"

namespace spright { namespace engine {

	class DefaultRenderTarget : public RenderTarget {
	public:
		void enable() override;
		void disable() override;
	};
}}