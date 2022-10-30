#pragma once
#include "../../engine/maths/vec2.h"

namespace my_app_editor { namespace tool {

	struct PointerInfo {
	public:
		bool isDown = false;
		my_app_engine::maths::Vec2 curr;
		my_app_engine::maths:: Vec2 down;
	public:
		PointerInfo();
	};
}}