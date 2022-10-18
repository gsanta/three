#pragma once

namespace my_app_engine { namespace system {

	class FrameListener {
	public:
		virtual void onUpdate(float deltaTime) = 0;
	};
}}
