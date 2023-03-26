#pragma once

namespace spright { namespace editor {

	class Timer {
	public:
		virtual void start() = 0;
		virtual float elapsed() = 0;
	};
}}
