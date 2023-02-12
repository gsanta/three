#pragma once

#include "../layer/dimensions.h"

namespace spright { namespace engine {

	class OrthoProjectionInfo {
	public:
		float left;
		float right;
		float bottom;
		float top;
		float near;
		float far;
	public:
		OrthoProjectionInfo(Dimensions dimensions, float near, float far);
		OrthoProjectionInfo();

		float getWidth() const;
		float getHeight() const;

		void setSize(float newWidth, float newHeigt);
	};
}}