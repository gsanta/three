#pragma once

#include "../../engine/graphics/renderer/image_render_target.h"
#include "../../engine/system/window/window.h"
#include "../document/document_store.h"
#include "../document/drawing.h"
#include "target_renderer.h"

namespace spright
{
namespace editor
{
    using namespace engine;

    class ImageTargetRenderer : public TargetRenderer
    {
    public:
        ImageTargetRenderer() = default;

        ImageTargetRenderer(DocumentStore *documentStore, Window *window);

        void render(Drawing &draing) override;
    };
} // namespace editor
} // namespace spright
