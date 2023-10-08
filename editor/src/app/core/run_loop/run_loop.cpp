#include "run_loop.h"

namespace spright
{
namespace editor
{

    RunLoop::RunLoop(Timer *timer) : m_Timer(timer)
    {
    }

    void RunLoop::add(Timed &timed)
    {
        m_Listeners.push_back(&timed);
    }

    void RunLoop::remove(Timed &timed)
    {
        auto it = find(m_Listeners.begin(), m_Listeners.end(), &timed);

        if (it != m_Listeners.end())
        {
            m_Listeners.erase(it);
            return;
        }

        throw std::invalid_argument("Failed to remove timed, not found");
    }

    bool RunLoop::has(Timed &timed)
    {
        auto it = find(m_Listeners.begin(), m_Listeners.end(), &timed);

        return it != m_Listeners.end();
    }

    void RunLoop::update()
    {
        for (Timed *listener : m_Listeners)
        {
            double elapsed = m_Timer->elapsed();
            listener->update(elapsed);
        }
    }

    void RunLoop::start()
    {
        m_Timer->reset();
    }
} // namespace editor
} // namespace spright
