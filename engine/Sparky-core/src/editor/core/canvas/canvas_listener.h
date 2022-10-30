#pragma once

#include "../../tool/pointer_info.h"

namespace my_app_editor { namespace core {
	class CanvasListener
	{
	public:
		inline virtual void pointerDown(my_app_editor::tool::PointerInfo& pointerInfo) {}
		inline virtual void pointerUp(my_app_editor::tool::PointerInfo& pointerInfo) {}
		inline virtual void pointerMove(my_app_editor::tool::PointerInfo& pointerInfo) {}
	};
}}