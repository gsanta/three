#pragma once

namespace spright { namespace engine {

	struct Dimensions {
		float left;
		float right;
		float bottom;
		float top;

		Dimensions(float left, float right, float bottom, float top);
		Dimensions();
	
		float getWidth();
		float getHeight();
		float getRatio();

		void setSize(float newWidth, float newHeight);
	};
}}