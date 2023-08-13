#pragma once

#include "../../core/run_loop/timed.h"
#include "../../document/drawing.h"
#include "../../editor_callbacks.h"
#include "../../event/event_emitter.h"

#include <iostream>

namespace spright
{
namespace editor
{
    class FramePlayer : public Timed
    {
    public:
        FramePlayer(float duration = 1000.0f);

        void update(int elapsed) override;

        void setIsActive(bool isActive);

        void setDuration(int duration);

        void setDrawing(Drawing *drawing);

        void clearDrawing();

    private:
        void setNextFrame();

    private:
        int m_Duration;

        bool m_IsActive;

        int m_Elapsed;

        Drawing *m_Drawing;
    };
} // namespace editor
} // namespace spright
