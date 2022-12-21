#include "../../engine/maths/vec2.h"

namespace spright {
	using namespace engine::maths;

	struct Rectangle {
		Vec2 bottomLeft;
		Vec2 topRight;

		Rectangle(Vec2 bottomLeft, Vec2 topRight);
		Rectangle();

		bool contains(Vec2 point);
	};

}