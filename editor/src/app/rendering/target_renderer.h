#pragma once

#include "../../engine/graphics/renderer/render_target.h"
#include "../document/document_store.h"
#include "../document/drawing.h"

#include <memory>

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class TargetRenderer
    {
    public:
        TargetRenderer() = default;

        TargetRenderer(DocumentStore *documentStore);

        void enable();

        void disable();

        virtual void render(Drawing &drawing) = 0;

    protected:
        DocumentStore *m_DocumentStore;

        std::unique_ptr<RenderTarget> m_RenderTarget;
    };
} // namespace editor
} // namespace spright
