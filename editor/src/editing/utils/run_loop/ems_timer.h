#pragma once

#include "timer.h"

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/emscripten.h>
#endif

namespace spright
{
namespace editing
{
    class EmsTimer : public Timer
    {
    public:
        void reset() override;

        long elapsed() override;

    private:
        double m_Previous;
    };
} // namespace editing
} // namespace spright
