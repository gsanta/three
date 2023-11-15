#pragma once

#include "../../engine/system/window/window_resized_listener.h"
#include "document_store.h"

#include <memory>

namespace spright
{
namespace editor
{
    using namespace engine;

    class UpdateScreenBounds : public WindowResizedListener
    {
    public:
        UpdateScreenBounds(std::shared_ptr<DocumentStore> documentStore);

        void onWindowSizeChanged(int newWidth, int newHeight) override;

    private:
        std::shared_ptr<DocumentStore> m_DocumentStore;
    };
} // namespace editor
} // namespace spright
