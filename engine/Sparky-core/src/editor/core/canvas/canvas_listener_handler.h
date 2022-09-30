#pragma once

#include <vector>
#include "canvas_listener.h"
#include "../../tool/pointer_info.h"
#include "../../../graphics/window/input_listener.h"
#include "../../tool/pointer_info.h"

namespace my_app { namespace editor { namespace core {

	class CanvasListenerHandler : public my_app::graphics::InputListener {
	private:
		std::vector<CanvasListener*> m_Listeners;
		my_app::editor::tool::PointerInfo m_PointerInfo;
	public:
		virtual void onMouseUp(int button) override;
		virtual void onMouseDown(int button) override;
		virtual void onMouseMove(double x, double y) override;


		void addListener(CanvasListener* listener);
		void removeListener(CanvasListener* listener);
	};

}}}