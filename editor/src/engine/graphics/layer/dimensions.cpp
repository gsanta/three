#include "dimensions.h"


namespace engine { namespace graphics {

	Dimensions::Dimensions(float left, float right, float bottom, float top): left(left), right(right), bottom(bottom), top(top)
	{
	}

	Dimensions::Dimensions() {}

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

	void Dimensions::setSize(float newWidth, float newHeight)
	{
		float deltaWidth = (newWidth - getWidth()) / 2.0f;

		left -= deltaWidth;
		right += deltaWidth;


		float deltaHeight = (newHeight - getHeight()) / 2.0f;

		top += deltaHeight;
		bottom -= deltaHeight;
	}
}}