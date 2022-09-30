#pragma once

#include "renderable2d.h"
#include "./renderer/vertex_data.h"

namespace my_app { namespace graphics {

	class Sprite : public Renderable2D {
	private:

	public:
		Sprite(float x, float y, float width, float height, unsigned int color);
#ifndef SPARKY_EMSCRIPTEN
		Sprite(float x, float y, float width, float height, Texture* texture);
#endif

		virtual void submit(Renderer2D* renderer) const override;
	};
} }