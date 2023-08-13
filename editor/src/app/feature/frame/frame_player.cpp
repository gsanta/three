#include "frame_player.h"

namespace spright
{
namespace editor
{
    FramePlayer::FramePlayer(float duration) : m_IsActive(false), m_Duration(duration), m_Elapsed(0)
    {
    }

    void FramePlayer::update(int elapsed)
    {
        if (!m_IsActive)
        {
            return;
        }

        m_Elapsed += elapsed;

        if (m_Elapsed > m_Duration)
        {
            int times = m_Elapsed / m_Duration;
            int remainder = m_Elapsed % m_Duration;

            for (int i = 0; i < times; i++)
            {
                setNextFrame();
            }

            on_active_frame_changed(m_Drawing->getActiveFrame().getIndex());
            m_Elapsed = remainder;
        }
    }

    void FramePlayer::setNextFrame()
    {
        if (m_Drawing->getActiveFrame().getIndex() == m_Drawing->getFrames().size() - 1)
        {
            m_Drawing->setActiveFrame(0);
        }
        else
        {
            m_Drawing->setActiveFrame(m_Drawing->getActiveFrame().getIndex() + 1);
        }
    }

    void FramePlayer::setIsActive(bool isActive)
    {
        m_IsActive = isActive;
    }

    void FramePlayer::setDuration(int duration)
    {
        m_Duration = duration;
    }

    void FramePlayer::setDrawing(Drawing *drawing)
    {
        m_Drawing = drawing;
    }

    void FramePlayer::clearDrawing()
    {
        m_Drawing = nullptr;
    }
} // namespace editor
} // namespace spright
