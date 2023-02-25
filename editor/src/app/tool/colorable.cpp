#include "colorable.h"

namespace spright { namespace editor {
	unsigned int editor::Colorable::getColor() const
	{
		return m_Color;
	}

	void Colorable::setColor(unsigned int color)
	{
		m_Color = color;
	}
}}