#pragma once

namespace spright { namespace engine {

	class RenderTarget {

	public:
		inline virtual ~RenderTarget() {}
		virtual void enable() = 0;
		virtual void disable() = 0;
	};
}}