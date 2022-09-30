#pragma once

#include "../../tool/pointer_info.h"

namespace my_app { namespace editor { namespace core {
	class CanvasListener
	{
	public:
		inline virtual void pointerDown(my_app::editor::tool::PointerInfo& pointerInfo) {}
		inline virtual void pointerUp(my_app::editor::tool::PointerInfo& pointerInfo) {}
		inline virtual void pointerMove(my_app::editor::tool::PointerInfo& pointerInfo) {}
	};
}}}