#pragma once

#include "../core/event/event_listener.h"

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/val.h>
#endif

namespace spright {
	class EmEvents : public EventListener {

	public:
		void dataChange() override;
	};
}

