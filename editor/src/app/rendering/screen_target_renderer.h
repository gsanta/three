#pragma once

#include "../../engine/graphics/renderer/default_render_target.h"
#include "../document/document_store.h"
#include "../document/drawing.h"
#include "target_renderer.h"

namespace spright
{
namespace editor
{
    class ScreenTargetRenderer : public TargetRenderer
    {
    public:
        ScreenTargetRenderer() = default;

        ScreenTargetRenderer(DocumentStore *documentStore);

        void render(Drawing &draing) override;

        void render3d(Drawing3d &drawing);
    };
} // namespace editor
} // namespace spright
