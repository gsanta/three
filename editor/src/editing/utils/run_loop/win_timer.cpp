#include "win_timer.h"

namespace spright
{
namespace editing
{
    void WinTimer::reset()
    {
        LARGE_INTEGER frequency;

        QueryPerformanceFrequency(&frequency);
        m_Frequency = (frequency.QuadPart) / 1000.0;

        LARGE_INTEGER counter;
        QueryPerformanceCounter(&counter);
        m_Previous = counter.QuadPart;
    }

    long WinTimer::elapsed()
    {
        LARGE_INTEGER current;
        QueryPerformanceCounter(&current);
        long millisecs = (current.QuadPart - m_Previous) / m_Frequency;
        m_Previous = current.QuadPart;
        return millisecs;
    }
} // namespace editing
} // namespace spright
