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

    void Window::addWindowResizedListener(WindowResizedListener *listener)
    {
        if (std::find(m_Listeners.begin(), m_Listeners.end(), listener) == m_Listeners.end())
        {
            m_Listeners.push_back(listener);
        }
    }

    void Window::removeWindowResizedListener(WindowResizedListener *listener)
    {
        std::vector<WindowResizedListener *>::iterator it = std::find(m_Listeners.begin(), m_Listeners.end(), listener);

        if (it != m_Listeners.end())
        {
            m_Listeners.erase(it);
        }
    }
} // namespace engine
} // namespace spright
