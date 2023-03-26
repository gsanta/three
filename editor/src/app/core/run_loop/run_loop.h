#pragma once

#include <vector>
#include <stdexcept>
#include <algorithm>
#include "./timed.h"
#include "timer.h"

namespace spright { namespace editor {

	class RunLoop {
	private:
		std::vector<Timed*> m_Listeners;
		Timer* m_Timer;

	public:
		RunLoop(Timer* timer);
		void add(Timed& timed);
		void remove(Timed& timed);
		bool has(Timed& timed);
	
		void start();
		void update();
	};
}}