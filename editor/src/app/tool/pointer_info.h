#pragma once
#include "../../maths/vec2.h"

namespace spright { namespace editor {

	struct PointerInfo {
	public:
		bool isDown = false;
		maths::Vec2 prev;
		maths::Vec2 curr;
		maths::Vec2 down;
		maths::Vec2 scroll;
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