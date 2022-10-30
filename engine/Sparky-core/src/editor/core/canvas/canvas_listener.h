#pragma once

#include "../../tool/pointer_info.h"

namespace spright_app { namespace core {
	class CanvasListener
	{
	public:
		inline virtual void pointerDown(spright_app::tool::PointerInfo& pointerInfo) {}
		inline virtual void pointerUp(spright_app::tool::PointerInfo& pointerInfo) {}
		inline virtual void pointerMove(spright_app::tool::PointerInfo& pointerInfo) {}
	};
}}