#pragma once
#include "../../../engine/graphics/renderer/renderer2d.h"

namespace spright { namespace editor {

	using namespace engine;

	class RendererProvider {

	public:
		virtual Renderer2D* createRenderer2D() const = 0;
		virtual RendererProvider* clone() const = 0;
	};
}}
