#pragma once
#include "../../engine/maths/vec2.h"

namespace spright { namespace tool {

	struct PointerInfo {
	public:
		bool isDown = false;
		engine::maths::Vec2 prev;
		engine::maths::Vec2 curr;
		engine::maths::Vec2 down;
		engine::maths::Vec2 scroll;
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