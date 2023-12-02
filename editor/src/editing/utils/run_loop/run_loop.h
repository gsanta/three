#pragma once

#include "./timed.h"
#include "timer.h"

#include <algorithm>
#include <stdexcept>
#include <vector>

namespace spright
{
namespace editing
{

    class RunLoop
    {
    private:
        std::vector<Timed *> m_Listeners;
        Timer *m_Timer;

    public:
        RunLoop(Timer *timer);
        void add(Timed &timed);
        void remove(Timed &timed);
        bool has(Timed &timed);

        void start();
        void update();
    };
} // namespace editing
} // namespace spright
