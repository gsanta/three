#pragma once

namespace my_app { namespace graphics {

	class InputListener {
	public:
		virtual void onMouseDown(int button) = 0;
		virtual void onMouseUp(int button) = 0;
		virtual void onMouseMove(double x, double y) = 0;
	};
}}