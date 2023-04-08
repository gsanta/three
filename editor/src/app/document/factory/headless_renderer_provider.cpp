#include "headless_renderer_provider.h"

namespace spright { namespace editor {
	HeadlessRenderer2D* HeadlessRendererProvider::createRenderer2D() const {
		return new HeadlessRenderer2D();
	}

	HeadlessRendererProvider* HeadlessRendererProvider::clone() const {
		return new HeadlessRendererProvider();
	}
}}