#pragma once
#include "../../../maths/vec2.h"

namespace spright { namespace engine {
	using namespace spright::maths;

	struct Bounds {
		float minX;
		float maxX;
		float minY;
		float maxY;

		Bounds(float minX, float minY, float width, float height);
		Bounds();

		static Bounds createWithPositions(float minX, float maxX, float minY, float maxY);

		friend bool operator==(const Bounds&, const Bounds&);
		friend bool operator!=(const Bounds&, const Bounds&);

		Vec2 getCenter() const;

		float getWidth() const;
		float getHeight() const;
		void setSize(float newWidth, float newHeight);
		bool contains(float x, float y);
	};
}}