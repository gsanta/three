#include "sprite.h"

namespace sparky { namespace graphics {
	Sprite::Sprite(float x, float y, float width, float height, unsigned int  color)
		: Renderable2D(maths::Vec3(x, y, 0), maths::Vec2(width, height), color)
	{

		m_bounds = new my_app::graphics::Bounds();
		m_bounds->minX = x - width / 2;
		m_bounds->maxX = x + width / 2;
		m_bounds->minY = y - width / 2;
		m_bounds->maxY = y + width / 2;
	}

#ifndef SPARKY_EMSCRIPTEN
	Sprite::Sprite(float x, float y, float width, float height, Texture* texture)
		: Renderable2D(maths::Vec3(x, y, 0), maths::Vec2(width, height), 0xffffffff)
	{
		m_Texture = texture;
	}
#endif

} }

