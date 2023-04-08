#pragma once
#include "renderer_provider.h"
#include "../../../engine/graphics/impl/headless/headless_renderer2d.h"
#include "../../../engine/graphics/impl/gl/gl_shader.h"
#include "../../../engine/graphics/impl/gl/gl_shader.h"

namespace spright { namespace editor {
	using namespace engine;

	class HeadlessRendererProvider : public RendererProvider {

	public:
		HeadlessRenderer2D* createRenderer2D() const override;
		HeadlessRendererProvider* clone() const override;
	};
}}
