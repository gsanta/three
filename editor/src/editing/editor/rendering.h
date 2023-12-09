#pragma once

#include "../../engine/graphics/renderer/default_render_target.h"
#include "../../engine/graphics/renderer/image_render_target.h"
#include "../../engine/graphics/renderer/render_target.h"
#include "../../engine/system/window/window.h"
#include "../document/document_store.h"
#include "../utils/conversions.h"

namespace spright
{
using namespace ::spright::engine;
using namespace spright::editing;

class Rendering
{
public:
    Rendering(Window *window, DocumentStore *documentStore);

    void render();

    void enableImageTarget();

    void enableScreenTarget();

private:
    enum Target
    {
        SCREEN,
        IMAGE
    };

    Window *m_Window;

    DocumentStore *m_DocumentStore;

    Target m_RenderingTarget = Rendering::Target::SCREEN;

    std::unique_ptr<RenderTarget> m_ImageRenderTarget;

    std::unique_ptr<RenderTarget> m_ScreenRenderTarget;
};
} // namespace spright
