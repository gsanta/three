#pragma once

namespace spright_engine { namespace system {

	class InputListener {
	public:
		virtual void onMouseDown(bool buttons[3]) = 0;
		virtual void onMouseUp(bool buttons[3]) = 0;
		virtual void onMouseMove(double x, double y) = 0;
		virtual void onScroll(double x, double y) = 0;
		virtual void onKeyChange(int key, bool isPressed) = 0;
	};
}}