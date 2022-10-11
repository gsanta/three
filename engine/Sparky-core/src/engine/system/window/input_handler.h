#pragma once

#include <vector>
#include "input_listener.h"
#include "window.h"
#include "../../maths/vec2.h"

using namespace std;

namespace my_app_engine { namespace system {

	class Window;

	class InputHandler
	{
	private:
		vector<InputListener*> m_Listeners;
		Window* m_Window;

	public:
		InputHandler(Window* window);
		~InputHandler();
		void emitMouseDown(int button);
		void emitMouseUp(int button);
		void emitMouseMove(double x, double y);

		void registerListener(InputListener* inputListener);
		void unRegisterListener(InputListener* inputListener);
	
		my_app_engine::maths::Vec2 screenToCanvasPos(my_app_engine::maths::Vec2 screenPos);
	};

}}
