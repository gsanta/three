#include "frame_player_handler.h"

namespace spright
{
namespace editor
{
    void FramePlayerHandler::update(double elapsed)
    {
        if (m_DocumentStore == nullptr)
        {
            return;
        }

        for (FramePlayer *player : m_FramePlayers)
        {
            player->update(elapsed);
        }
    }

    void FramePlayerHandler::setDocumentStore(DocumentStore *documentStore)
    {
        m_DocumentStore = documentStore;
    }

    void FramePlayerHandler::addDrawing(Drawing &drawing)
    {
        m_FramePlayers.push_back(new FramePlayer(drawing));
    }

} // namespace editor
} // namespace spright
