#pragma once

#include "../../maths/vec2.h"

namespace spright { namespace editor {

	struct Rectangle {
		maths::Vec2 bottomLeft;
		maths::Vec2 topRight;

		Rectangle(maths::Vec2 bottomLeft, maths::Vec2 topRight);
		Rectangle();

		bool contains(maths::Vec2 point);
		float width();
		float height();
	};

}}