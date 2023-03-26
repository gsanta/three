#pragma once

#include <Windows.h>
#include "timer.h"

namespace spright { namespace editor {

	class WinTimer : public Timer {
	private:
		unsigned __int64 m_Previous;
		double m_Frequency;

	public:
		void start() override;
		float elapsed() override;
	};
}}
