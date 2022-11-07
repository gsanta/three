#pragma once

namespace spright_engine { namespace system {

	class InputListener {
	public:
		virtual void onMouseDown(int button) = 0;
		virtual void onMouseUp(int button) = 0;
		virtual void onMouseMove(double x, double y) = 0;
		virtual void onScroll(double x, double y) = 0;
	};
}}