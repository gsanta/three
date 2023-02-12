#include "rectangle.h"

namespace spright { namespace editor {

	Rectangle::Rectangle(maths::Vec2 bottomLeft, maths::Vec2 topRight) : bottomLeft(bottomLeft), topRight(topRight)
	{
	}

	Rectangle::Rectangle()
	{
	}

	bool Rectangle::contains(maths::Vec2 point)
	{
		bool ret = point.x > bottomLeft.x && point.x < topRight.x&& point.y > bottomLeft.y && point.y < topRight.y;
		return ret;
	}

	float Rectangle::width() {
		return topRight.x - bottomLeft.x;
	}

	float Rectangle::height() {
		return topRight.y - bottomLeft.y;
	}
}}
