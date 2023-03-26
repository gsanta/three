#include "ems_timer.h"

namespace spright { namespace editor {
	void EmsTimer::start() {
#ifdef SPARKY_EMSCRIPTEN
		m_Previous = emscripten_get_now();
#endif
	}

	float EmsTimer::elapsed() {
#ifdef SPARKY_EMSCRIPTEN
		double current = emscripten_get_now();
		double elapsed = current - m_Previous;
		m_Previous = current;

		return elapsed;
#else
		return 0;
#endif
	}
}}