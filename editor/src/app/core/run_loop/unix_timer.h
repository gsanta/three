#pragma once

#include <ctime>
#include "timer.h"

namespace spright { namespace editor {

	class UnixTimer : public Timer {
	private:
		double m_Previous;

	public:
		void start() override;
		float elapsed() override;

	private:
		double getTime();
	};
}}
