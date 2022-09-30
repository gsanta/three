#pragma once
#include "../../maths/vec2.h"

namespace my_app { namespace editor { namespace tool {

	using namespace my_app;

	struct PointerInfo {
	public:
		bool isDown = false;
		my_app::maths::Vec2 curr;
		my_app::maths:: Vec2 down;
	public:
		PointerInfo();
	};
}}}