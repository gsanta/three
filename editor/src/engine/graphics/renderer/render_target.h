#pragma once

namespace spright { namespace engine {

	class RenderTarget {

	public:
		virtual void enable() = 0;
		virtual void disable() = 0;
	};
}}