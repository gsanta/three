#pragma once

namespace spright_engine { namespace graphics {

	struct Dimensions {
		float left;
		float right;
		float bottom;
		float top;

		Dimensions(float left, float right, float bottom, float top);
	};
}}