#include "win_timer.h"

namespace spright { namespace editor {

	void WinTimer::start() {
		LARGE_INTEGER frequency;

		QueryPerformanceFrequency(&frequency);
		m_Frequency = double(frequency.QuadPart) / 1000.0;

		LARGE_INTEGER counter;
		QueryPerformanceCounter(&counter);
		m_Previous = counter.QuadPart;
	}

	float WinTimer::elapsed() {
		LARGE_INTEGER current;
		QueryPerformanceCounter(&current);
		double millisecs = double(current.QuadPart - m_Previous) / m_Frequency;
		m_Previous = current.QuadPart;
		return millisecs;
	}
}}