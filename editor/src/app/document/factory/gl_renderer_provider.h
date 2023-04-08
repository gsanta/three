#pragma once
#include "renderer_provider.h"
#include "../../../engine/graphics/impl/gl/gl_renderer2d.h"
#include "../../../engine/graphics/impl/gl/gl_shader.h"
#include "../../../engine/graphics/impl/gl/gl_shader.h"

namespace spright { namespace editor {
	using namespace engine;

	class GLRendererProvider : public RendererProvider {

	public:
		GLRenderer2D* createRenderer2D() const override;
		GLRendererProvider* clone() const override;
	};
}}
