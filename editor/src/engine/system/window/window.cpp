#include "window.h"

namespace spright
{
namespace engine
{

    int Window::getWidth() const
    {
        return m_Width;
    }

    int Window::getHeight() const
    {
        return m_Height;
    }

    void Window::setSize(int width, int height)
    {
        m_Width = width;
        m_Height = height;
    }
} // namespace engine
} // namespace spright
