#pragma once

#include <vector>
#include "input_listener.h"
#include "window.h"

using namespace std;

namespace my_app { namespace graphics {

	class Window;

	class InputHandler
	{
	private:
		vector<InputListener*> m_Listeners;
		Window* m_Window;

	public:
		InputHandler(Window* window);
		void emitMouseDown(int button);
		void emitMouseUp(int button);
		void emitMouseMove(double x, double y);

		void registerListener(InputListener* inputListener);
		void unRegisterListener(InputListener* inputListener);
	};

}}
