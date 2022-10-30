#pragma once
#include "../../engine/maths/vec2.h"

namespace spright_app { namespace tool {

	struct PointerInfo {
	public:
		bool isDown = false;
		spright_engine::maths::Vec2 curr;
		spright_engine::maths:: Vec2 down;
	public:
		PointerInfo();
	};
}}