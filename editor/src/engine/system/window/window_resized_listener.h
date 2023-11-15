#pragma once

namespace spright
{
namespace engine
{
    class WindowResizedListener
    {
    public:
        virtual void onWindowSizeChanged(int newWidth, int newHeight) = 0;
    };
} // namespace engine
} // namespace spright
