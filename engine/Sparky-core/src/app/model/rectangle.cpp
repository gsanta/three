#include "rectangle.h"

namespace spright {

	Rectangle::Rectangle(Vec2 bottomLeft, Vec2 topRight) : bottomLeft(bottomLeft), topRight(topRight)
	{
	}

	Rectangle::Rectangle()
	{
	}

	bool Rectangle::contains(Vec2 point)
	{
		bool ret = point.x > bottomLeft.x && point.x < topRight.x && point.y > bottomLeft.y && point.y < topRight.y;
		return ret;
	}
}
