#include "headless_renderer2d.h"

namespace spright { namespace engine {
	void HeadlessRenderer2D::begin()
	{

	}

	HeadlessRenderer2D* HeadlessRenderer2D::clone() const {
		return new HeadlessRenderer2D();
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

	Shader& HeadlessRenderer2D::getShader()
	{
		return m_Shader;
	}
}}
