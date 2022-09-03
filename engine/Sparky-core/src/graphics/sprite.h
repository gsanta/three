#pragma once

#include "renderable2d.h"

namespace sparky { namespace graphics {

	class Sprite : public Renderable2D {
	private:

	public:
		Sprite(float x, float y, float width, float height, maths::Vec4 color);
#ifndef SPARKY_EMSCRIPTEN
		Sprite(float x, float y, float width, float height, Texture* texture);
#endif
	};
} }