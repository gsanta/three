#pragma once
#include <GL/glew.h>
#include <iostream>
#include "render_target.h"
#include "../../system/window/window.h"

namespace spright { namespace engine {

	class ImageRenderTarget : public RenderTarget {
	private:
		unsigned int m_FrameBuffer;
		unsigned int m_Texture;
		Window* m_Window;

	public:
		ImageRenderTarget(Window* window);
		void enable();
		void disable();
	private:
		void init();
	};
}}