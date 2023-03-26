
#pragma once

#include "../src/app/core/run_loop/timer.h"

using namespace spright::editor;

class MockTimer : public Timer {
public:
	inline void start() override {

	}

	inline float elapsed() override {
		return 0;
	}
};
