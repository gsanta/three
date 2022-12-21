#pragma once
#include "../../maths/vec2.h"

namespace engine { namespace graphics {
	using namespace maths;

	class Bounds {

	public:
		float minX;
		float maxX;
		float minY;
		float maxY;

		Bounds(float bottomLeftX, float bottomLeftY, float width, float height);

		maths::Vec2 getCenter() const;

		float getWidth() const;
		float getHeight() const;
	};
}}