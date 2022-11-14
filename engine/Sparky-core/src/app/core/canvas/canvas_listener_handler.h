#pragma once

#include <vector>
#include "canvas_listener.h"
#include "../../tool/pointer_info.h"
#include "../../../engine/system/window/input_listener.h"
#include "../../tool/pointer_info.h"

namespace spright_app { namespace core {

	class CanvasListenerHandler : public spright_engine::system::InputListener {
	private:
		std::vector<CanvasListener*> m_Listeners;
		spright_app::tool::PointerInfo m_PointerInfo;
	public:
		virtual void onMouseUp(bool buttons[3]) override;
		virtual void onMouseDown(bool buttons[3]) override;
		virtual void onMouseMove(double x, double y) override;


		void addListener(CanvasListener* listener);
		void removeListener(CanvasListener* listener);
	};

}}