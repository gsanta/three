#include "unix_timer.h"

namespace spright
{
namespace editing
{

    void UnixTimer::reset()
    {
        m_Previous =
            std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch());
    }

    long UnixTimer::elapsed()
    {
        std::chrono::milliseconds current =
            std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch());
        std::chrono::milliseconds elapsed = current - m_Previous;
        // m_Previous = current;
        return elapsed.count();
    }

    double UnixTimer::getTime()
    {
        return time(NULL);
    }
} // namespace editing
} // namespace spright
