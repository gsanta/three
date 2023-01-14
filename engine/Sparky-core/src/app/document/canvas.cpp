#include "canvas.h"

namespace spright {
	Canvas::Canvas(int width, int height) : m_Width(width), m_Height(height)
	{
	}

	float Canvas::getWidth()
	{
		return m_Width;
	}

	float Canvas::getHeight()
	{
		return m_Height;
	}
}