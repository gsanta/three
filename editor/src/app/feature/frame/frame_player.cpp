#include "frame_player.h"

namespace spright
{
namespace editor
{

    FramePlayer::FramePlayer(Drawing &drawing) : m_IsActive(false), m_Elapsed(0), m_Drawing(drawing)
    {
    }

    void FramePlayer::update(double elapsed)
    {
        m_Elapsed += elapsed;

        if (m_Elapsed > 1000.0)
        {

            if (m_IsActive)
            {
                if (m_Drawing.getActiveFrame().getIndex() == m_Drawing.getFrames().size() - 1)
                {
                    m_Drawing.setActiveFrame(0);
                }
                else
                {
                    m_Drawing.setActiveFrame(m_Drawing.getActiveFrame().getIndex() + 1);
                }
            }
            m_Elapsed = 0;
        }
    }

    void FramePlayer::setIsActive(bool isActive)
    {
        m_IsActive = isActive;
    }
} // namespace editor
} // namespace spright
