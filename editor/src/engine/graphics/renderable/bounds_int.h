#pragma once

namespace spright { namespace engine {

	class BoundsInt {
	public:
		int minX;
		int maxX;
		int minY;
		int maxY;

		BoundsInt();
		BoundsInt(int minX, int maxX, int minY, int maxY);

		int getWidth() const;
		int getHeight() const;
	};

}}