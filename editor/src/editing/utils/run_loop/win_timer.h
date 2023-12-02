#pragma once

#include "timer.h"

#include <Windows.h>

namespace spright
{
namespace editing
{

    class WinTimer : public Timer
    {
    public:
        void reset() override;

        long elapsed() override;

    private:
        unsigned __int64 m_Previous;

        long m_Frequency;
    };
} // namespace editing
} // namespace spright
