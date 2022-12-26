#pragma once
#include <GL/glew.h>
#include <iostream>
#include "render_target.h"

namespace spright { namespace engine {

	class ImageRenderTarget : public RenderTarget {
	private:
		unsigned int m_FrameBuffer;
		unsigned int m_Texture;

	public:
		ImageRenderTarget();
		void enable();
		void disable();
	private:
		void init();
	};
}}