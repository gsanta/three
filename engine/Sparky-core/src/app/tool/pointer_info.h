#pragma once
#include "../../engine/maths/vec2.h"

namespace spright_app { namespace tool {

	struct PointerInfo {
	public:
		bool isDown = false;
		spright_engine::maths::Vec2 prev;
		spright_engine::maths::Vec2 curr;
		spright_engine::maths::Vec2 down;
		spright_engine::maths::Vec2 scroll;
		bool buttons[3];
	public:
		PointerInfo();

		bool isLeftButtonDown() {
			return buttons[0];
		}

		bool isRightButtonDown() {
			return buttons[1];
		}

		bool isMiddleButtonDown() {
			return buttons[2];
		}
	};
}}