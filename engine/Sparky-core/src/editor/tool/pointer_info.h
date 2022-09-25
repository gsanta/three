#pragma once
#include "../../maths/vec2.h"

namespace my_app { namespace editor { namespace tool {

	using namespace sparky;

	struct PointerInfo {
	public:
		bool isDown = false;
		sparky::maths::Vec2 curr;
		sparky::maths:: Vec2 down;
	public:
		PointerInfo();
	};
}}}