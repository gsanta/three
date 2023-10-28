#pragma once

#include "../../../maths/vec2.h"
#include "input_listener.h"

#include <algorithm>
#include <vector>

namespace spright
{
namespace engine
{
    using namespace spright::maths;

    class InputHandler
    {
    public:
        void emitMouseDown(bool buttons[3]);

        void emitMouseUp(bool buttons[3]);

        void emitMouseMove(double x, double y);

        void emitScroll(double x, double y);

        void emitKeyChange(int key, bool isPressed);

        void registerListener(InputListener *inputListener);

        void unRegisterListener(InputListener *inputListener);

    private:
        std::vector<InputListener *> m_Listeners;
    };

} // namespace engine
} // namespace spright
