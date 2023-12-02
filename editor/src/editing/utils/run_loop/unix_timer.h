#pragma once

#include "timer.h"

#include <chrono>
#include <ctime>

namespace spright
{
namespace editing
{

    class UnixTimer : public Timer
    {
    public:
        void reset() override;

        long elapsed() override;

    private:
        double getTime();

    private:
        // double m_Previous;

        std::chrono::milliseconds m_Previous;
    };
} // namespace editing
} // namespace spright
