#include "renderable2d.h"

namespace sparky { namespace graphics {

	void Renderable2D::setSize(maths::Vec2 size)
	{
		this->m_Size = size;
	}

	void Renderable2D::setPosition(maths::Vec3 position)
	{
		this->m_Position = position;
	}
}}