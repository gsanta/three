#include "headless_renderer2d.h"

namespace spright { namespace engine {

	HeadlessRenderer2D::HeadlessRenderer2D(): Renderer2D(std::make_shared<HeadlessShader>()) {

	}


	void HeadlessRenderer2D::begin()
	{

	}

	void HeadlessRenderer2D::end()
	{

	}

	void HeadlessRenderer2D::flush()
	{

	}

	VertexData*& HeadlessRenderer2D::getBuffer() {
		return m_Buffer;
	}
}}
