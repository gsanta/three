#include "renderable2d.h"

namespace my_app { namespace graphics {

	void Renderable2D::setSize(maths::Vec2 size)
	{
		this->m_Size = size;
	}

	void Renderable2D::setPosition(maths::Vec3 position)
	{
		this->m_Position = position;
	}
}}