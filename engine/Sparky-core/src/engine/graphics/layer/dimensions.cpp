#include "dimensions.h"


namespace engine { namespace graphics {

	Dimensions::Dimensions(float left, float right, float bottom, float top): left(left), right(right), bottom(bottom), top(top)
	{
	}

	float Dimensions::getWidth()
	{
		return right - left;
	}

	float Dimensions::getHeight()
	{
		return top - bottom;
	}

	float Dimensions::getRatio() {
		return getWidth() / getHeight();
	}
}}