#include "rectangle.h"

namespace spright {

	Rectangle::Rectangle(maths::Vec2 bottomLeft, maths::Vec2 topRight) : bottomLeft(bottomLeft), topRight(topRight)
	{
	}

	Rectangle::Rectangle()
	{
	}

	bool Rectangle::contains(maths::Vec2 point)
	{
		bool ret = point.x > bottomLeft.x && point.x < topRight.x && point.y > bottomLeft.y && point.y < topRight.y;
		return ret;
	}
}
