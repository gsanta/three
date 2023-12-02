#pragma once

#include "iostream"

namespace spright
{
namespace editing
{
    class Timer
    {
    public:
        virtual void reset() = 0;

        virtual long elapsed() = 0;

        static Timer *getTimer();
    };
} // namespace editing
} // namespace spright
