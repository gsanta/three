#pragma once

namespace engine { namespace graphics {

	class OrthoProjectionInfo {
	public:
		float left;
		float right;
		float bottom;
		float top;
		float near = -1.0f;
		float far = 1.0f;
	public:
		OrthoProjectionInfo(float left, float right, float bottom, float top);
	};
}}