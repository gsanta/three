#pragma once
#include "../../system/window/window.h"
#include "render_target.h"

#include <GL/glew.h>
#include <iostream>

namespace spright
{
namespace engine
{

    class ImageRenderTarget : public RenderTarget
    {
    public:
        ImageRenderTarget(Window *window);

        void enable();

        void disable();

    private:
        void init();

    private:
        unsigned int m_FrameBuffer;

        unsigned int m_Texture;

        Window *m_Window;
    };
} // namespace engine
} // namespace spright
