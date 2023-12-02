#include "timer.h"

#ifdef SPARKY_EMSCRIPTEN
#include "ems_timer.h"
#elif _WIN32
#include "win_timer.h"
#else
#include "unix_timer.h"
#endif

#include "test_timer.h"

extern bool SPRIGHT_IS_TEST;

namespace spright
{
namespace editing
{
    Timer *Timer::getTimer()
    {
#ifdef SPRIGHT_TEST
        return TestTimer::getInstance();
#elif SPARKY_EMSCRIPTEN
        return new EmsTimer();
#elif _WIN32
        return new WinTimer();
#else
        return new UnixTimer();
#endif
    }
} // namespace editing
} // namespace spright
