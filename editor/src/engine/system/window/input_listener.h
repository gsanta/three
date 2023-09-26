#pragma once

namespace spright
{
namespace engine
{

    class InputListener
    {
    public:
        virtual void onMouseDown(bool buttons[3])
        {
        }
        virtual void onMouseUp(bool buttons[3])
        {
        }
        virtual void onMouseMove(double x, double y)
        {
        }
        virtual void onScroll(double x, double y)
        {
        }
        virtual void onKeyChange(int key, bool isPressed)
        {
        }
    };
} // namespace engine
} // namespace spright
