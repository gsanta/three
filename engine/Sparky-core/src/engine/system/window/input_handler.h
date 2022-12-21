#pragma once

#include <vector>
#include "input_listener.h"
#include "window.h"
#include "../../../maths/vec2.h"

using namespace std;

namespace engine { namespace system {
	using namespace spright::maths;

	class Window;

	class InputHandler
	{
	private:
		vector<InputListener*> m_Listeners;
		Window* m_Window;

	public:
		InputHandler(Window* window);
		~InputHandler();
		void emitMouseDown(bool buttons[3]);
		void emitMouseUp(bool buttons[3]);
		void emitMouseMove(double x, double y);
		void emitScroll(double x, double y);
		void emitKeyChange(int key, bool isPressed);

		void registerListener(InputListener* inputListener);
		void unRegisterListener(InputListener* inputListener);
	
		Vec2 screenToCanvasPos(Vec2 screenPos);
	};

}}
