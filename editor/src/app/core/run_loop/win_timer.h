#pragma once

#include "timer.h"

#include <Windows.h>

namespace spright
{
namespace editor
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
} // namespace editor
} // namespace spright
