#include "image_render_target.h"

namespace spright
{
namespace engine
{
    ImageRenderTarget::ImageRenderTarget(Window *window) : m_Window(window)
    {
        init();
    }

    void ImageRenderTarget::init()
    {
    }

    void ImageRenderTarget::enable()
    {
        glGenFramebuffers(1, &m_FrameBuffer);
        glBindFramebuffer(GL_FRAMEBUFFER, m_FrameBuffer);

        glGenTextures(1, &m_Texture);
        glBindTexture(GL_TEXTURE_2D, m_Texture);
        glTexImage2D(GL_TEXTURE_2D,
                     0,
                     GL_RGBA,
                     m_Window->getWidth(),
                     m_Window->getHeight(),
                     0,
                     GL_RGBA,
                     GL_UNSIGNED_BYTE,
                     nullptr);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
        glBindTexture(GL_TEXTURE_2D, 0);

        glFramebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, m_Texture, 0);

        if (glCheckFramebufferStatus(GL_FRAMEBUFFER) != GL_FRAMEBUFFER_COMPLETE)
        {
            std::cout << "ERROR::FRAMEBUFFER:: Framebuffer is not complete!" << std::endl;
        }

        glClearColor(0.0f, 0.0f, 0.0f, 0.0f);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    }

    void ImageRenderTarget::disable()
    {
        glDeleteTextures(1, &m_Texture);
        glDeleteFramebuffers(1, &m_FrameBuffer);
    }
} // namespace engine
} // namespace spright
