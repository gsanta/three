#pragma once

#include "timer.h"

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/emscripten.h>
#endif

namespace spright { namespace editor {

	class EmsTimer : public Timer {
	private:
		double m_Previous;
	public:
		void start() override;
		float elapsed() override;
	};
}}
