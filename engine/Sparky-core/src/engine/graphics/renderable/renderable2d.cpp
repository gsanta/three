#include "renderable2d.h"

namespace engine { namespace graphics {

	Renderable2D::Renderable2D(unsigned int color) : m_Color(color)
	{
		setUVDefaults();
	}

	void Renderable2D::setUVDefaults() {
		m_UV.push_back(Vec2(0, 0));
		m_UV.push_back(Vec2(0, 1));
		m_UV.push_back(Vec2(1, 1));
		m_UV.push_back(Vec2(1, 0));
	}

}}