#include "update_screen_bounds.h"

namespace spright
{
namespace editing
{
    UpdateScreenBounds::UpdateScreenBounds(std::shared_ptr<DocumentStore> documentStore)
        : m_DocumentStore(documentStore)
    {
    }

    void UpdateScreenBounds::onWindowSizeChanged(int newWidth, int newHeight)
    {
        m_DocumentStore->getActiveDocument().getBackgroundCanvas().getCamera()->setScreenBounds(
            BoundsInt(0, 0, newWidth, newHeight));
    }
} // namespace editing
} // namespace spright
