#include "bounds_int.h"

namespace spright_engine { namespace graphics {

	BoundsInt::BoundsInt() {}

	BoundsInt::BoundsInt(int minX, int maxX, int minY, int maxY): minX(minX), maxX(maxX), minY(minY), maxY(maxY) {

	}


	int BoundsInt::getWidth() const
	{
		return maxX - minX;
	}

	int BoundsInt::getHeight() const
	{
		return maxY - minY;
	}

}}
