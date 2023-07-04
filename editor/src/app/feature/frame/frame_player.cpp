#include "frame_player.h"

namespace spright
{
namespace editor
{

    FramePlayer::FramePlayer(FrameStore &frameStore) : m_IsActive(false), m_Elapsed(0), m_FrameStore(frameStore)
    {
    }

    void FramePlayer::update(double elapsed)
    {
        m_Elapsed += elapsed;

        if (m_Elapsed > 1000.0)
        {

            if (m_IsActive)
            {
                m_FrameStore.activateNextFrame();
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
