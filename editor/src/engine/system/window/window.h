#pragma once

#include "input_handler.h"
#include "window_resized_listener.h"

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <functional>
#include <iostream>

namespace spright
{
namespace engine
{
    class Window
    {
    public:
        inline Window(int width, int height) : m_Width(width), m_Height(height)
        {
        }

        inline virtual ~Window()
        {
        }

        virtual void clear() const = 0;

        virtual float beforeRender() = 0;

        virtual void afterRender() = 0;

        virtual bool closed() const = 0;

        int getWidth() const;

        int getHeight() const;

        virtual void setSize(int width, int height);

        virtual bool isKeyPressed(unsigned int keycode) const = 0;

        virtual bool isMouseButtonPressed(unsigned int button) const = 0;

        virtual void getMousePosition(double &x, double &y) const = 0;

        virtual float getRatio() = 0;

        virtual InputHandler *getInputHandler() const = 0;

        void addWindowResizedListener(WindowResizedListener *listener);

        void removeWindowResizedListener(WindowResizedListener *listener);

    protected:
        int m_Width;

        int m_Height;

        std::vector<WindowResizedListener *> m_Listeners;
    };
} // namespace engine
} // namespace spright
