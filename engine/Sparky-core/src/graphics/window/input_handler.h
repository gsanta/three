#pragma once

#include <vector>
#include "input_listener.h"

using namespace std;

namespace my_app { namespace graphics {

	class InputHandler
	{
	private:
		vector<InputListener*> m_Listeners;

	public:
		void emitMouseDown(int button);
		void emitMouseUp(int button);

		void registerListener(InputListener* inputListener);
		void unRegisterListener(InputListener* inputListener);
	};

}}
