#pragma once

#include "../../engine/system/window/window.h"
#include "../document/document_store.h"
#include "./image_target_renderer.h"
#include "./screen_target_renderer.h"

namespace spright
{
using namespace ::spright::engine;
using namespace ::spright::editor;

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

    ImageTargetRenderer m_ImageTargetRenderer;

    ScreenTargetRenderer m_ScreenTargetRenderer;

    Target m_RenderingTarget = Rendering::Target::SCREEN;
};
} // namespace spright
