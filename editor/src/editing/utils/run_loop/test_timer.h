
#pragma once

#include "timer.h"

using namespace spright::editing;

namespace spright
{
namespace editing
{
    class TestTimer : public Timer
    {
    public:
        TestTimer();

        TestTimer(const TestTimer &obj) = delete;

        void reset() override;

        long elapsed() override;

        void setElapsed(long elapsed);

        static TestTimer *getInstance();

    private:
        static TestTimer *m_InstancePtr;

        long m_Elapsed = 0;
    };
} // namespace editing
} // namespace spright
