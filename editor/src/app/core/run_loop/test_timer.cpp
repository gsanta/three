#include "test_timer.h"

namespace spright
{
namespace editor
{
    TestTimer *TestTimer::m_InstancePtr = nullptr;

    TestTimer::TestTimer(){};

    void TestTimer::reset()
    {
        m_Elapsed = 0;
    }

    long TestTimer::elapsed()
    {
        return m_Elapsed;
    }

    void TestTimer::setElapsed(long elapsed)
    {
        m_Elapsed = elapsed;
    }

    TestTimer *TestTimer::getInstance()
    {
        if (m_InstancePtr == nullptr)
        {
            m_InstancePtr = new TestTimer();
            return m_InstancePtr;
        }
        else
        {
            return m_InstancePtr;
        }
    }
} // namespace editor
} // namespace spright
