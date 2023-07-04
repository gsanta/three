#pragma once

#include "../../core/run_loop/timed.h"
#include "../../document/frame_store.h"
#include "../../event/event_emitter.h"

#include <iostream>

namespace spright
{
namespace editor
{
    class FramePlayer : public Timed
    {
    public:
        FramePlayer(FrameStore &frameStore);

        void update(double elapsed) override;

        void setIsActive(bool isActive);

    private:
        bool m_IsActive;

        double m_Elapsed;

        FrameStore &m_FrameStore;
    };
} // namespace editor
} // namespace spright
