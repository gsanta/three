#pragma once

#include "timer.h"

#include <chrono>
#include <ctime>

namespace spright
{
namespace editor
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
} // namespace editor
} // namespace spright
