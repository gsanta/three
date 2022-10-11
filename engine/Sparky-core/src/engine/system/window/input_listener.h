#pragma once

namespace my_app_engine { namespace system {

	class InputListener {
	public:
		virtual void onMouseDown(int button) = 0;
		virtual void onMouseUp(int button) = 0;
		virtual void onMouseMove(double x, double y) = 0;
	};
}}