#pragma once

#include <vector>
#include "canvas_listener.h"
#include "../../tool/pointer_info.h"
#include "../../../engine/system/window/input_listener.h"
#include "../../tool/pointer_info.h"

namespace spright { namespace core {
	using namespace ::engine::system;

	class CanvasListenerHandler : public InputListener {
	private:
		std::vector<CanvasListener*> m_Listeners;
		spright::tool::PointerInfo m_PointerInfo;
	public:
		virtual void onMouseUp(bool buttons[3]) override;
		virtual void onMouseDown(bool buttons[3]) override;
		virtual void onMouseMove(double x, double y) override;


		void addListener(CanvasListener* listener);
		void removeListener(CanvasListener* listener);
	};

}}