#pragma once

#include "../../core/run_loop/timed.h"
#include "../../document/drawing.h"
#include "../../event/event_emitter.h"

#include <iostream>

namespace spright
{
namespace editor
{
    class FramePlayer : public Timed
    {
    public:
        FramePlayer(Drawing &drawing);

        void update(double elapsed) override;

        void setIsActive(bool isActive);

    private:
        bool m_IsActive;

        double m_Elapsed;

        Drawing &m_Drawing;
    };
} // namespace editor
} // namespace spright
