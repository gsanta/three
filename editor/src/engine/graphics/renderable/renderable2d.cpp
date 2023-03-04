#include "renderable2d.h"

namespace spright { namespace engine {

	Renderable2D::Renderable2D(const Bounds& bounds, unsigned int color) : m_bounds(bounds), m_Color(color)
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
