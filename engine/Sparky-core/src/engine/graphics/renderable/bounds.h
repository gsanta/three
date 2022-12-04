#pragma once
#include "../../maths/vec2.h"

namespace spright_engine { namespace graphics {

	class Bounds {

	public:
		float minX;
		float maxX;
		float minY;
		float maxY;

		maths::Vec2 getCenter() const;
	};
}}