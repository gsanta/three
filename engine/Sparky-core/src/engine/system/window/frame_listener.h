#pragma once

namespace engine { namespace system {

	class FrameListener {
	public:
		virtual void onUpdate(float deltaTime) = 0;
	};
}}
