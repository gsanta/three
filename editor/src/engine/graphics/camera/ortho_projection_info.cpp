#include "ortho_projection_info.h"

namespace engine { namespace graphics {
	OrthoProjectionInfo::OrthoProjectionInfo(float left, float right, float bottom, float top): left(left), right(right), bottom(bottom), top(top)
	{

	}

	OrthoProjectionInfo::OrthoProjectionInfo() {}

	float OrthoProjectionInfo::getWidth() {
		return right - left;
	}

	float OrthoProjectionInfo::getHeight() {
		return top - bottom;
	}
}}
