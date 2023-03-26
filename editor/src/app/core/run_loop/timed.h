#pragma once

namespace spright { namespace editor {

	class Timed {

	public:
		virtual void update(double elapsed) = 0;
	};
}}
