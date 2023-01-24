#pragma once

namespace engine { namespace graphics {

	struct Dimensions {
		float left;
		float right;
		float bottom;
		float top;

		Dimensions(float left, float right, float bottom, float top);
	
		float getWidth();
		float getHeight();
		float getRatio();
	};
}}