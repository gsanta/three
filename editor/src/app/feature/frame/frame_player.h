#pragma once

#include <iostream>
#include "../../core/run_loop/timed.h"
#include "../../document/frame_store.h"
#include "../../event/event_emitter.h"

namespace spright { namespace editor {

	class FramePlayer : public Timed {
	private:
		bool m_IsActive;
		double m_Elapsed;
		FrameStore& m_FrameStore;
		EventEmitter* m_EventEmitter;

	public:
		FramePlayer(FrameStore& frameStore, EventEmitter* eventEmitter);
		void update(double elapsed) override;
		void setIsActive(bool isActive);
	};
}}
