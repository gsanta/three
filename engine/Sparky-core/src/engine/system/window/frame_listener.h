#pragma once

namespace spright_engine { namespace system {

	class FrameListener {
	public:
		virtual void onUpdate(float deltaTime) = 0;
	};
}}
