#pragma once

#include "../../editing/editor/editor_callbacks.h"
#include "../../editing/event/event_emitter.h"
#include "../../editing/utils/run_loop/timed.h"
#include "../../engine/scene/canvas/tile_canvas.h"

#include <iostream>

namespace spright
{
namespace features
{
    using namespace editing;

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
} // namespace features
} // namespace spright
