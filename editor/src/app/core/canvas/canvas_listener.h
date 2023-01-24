#pragma once

#include "../../tool/pointer_info.h"

namespace spright { namespace core {
	class CanvasListener
	{
	public:
		inline virtual void pointerDown(spright::tool::PointerInfo& pointerInfo) {}
		inline virtual void pointerUp(spright::tool::PointerInfo& pointerInfo) {}
		inline virtual void pointerMove(spright::tool::PointerInfo& pointerInfo) {}
	};
}}