#pragma once

#include "../../input_handler.h"
#include "../../window.h"

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <functional>
#include <iostream>

namespace spright
{
namespace engine
{
    class HeadlessWindow : public Window
    {
    public:
        inline HeadlessWindow(int width, int height) : Window(width, height)
        {
        }

        inline void clear() const
        {
        }

        inline float beforeRender()
        {
            return 0;
        }

        inline void afterRender()
        {
        }

        inline bool closed() const
        {
            return false;
        }

        inline void setSize(int width, int height)
        {
            m_Width = width;
            m_Height = height;
        }

        bool isKeyPressed(unsigned int keycode) const
        {
            return false;
        }

        bool isMouseButtonPressed(unsigned int button) const
        {
            return false;
        }

        void getMousePosition(double &x, double &y) const
        {
        }

        float getRatio()
        {
            return m_Width / m_Height;
        }

        InputHandler *getInputHandler() const
        {
            return nullptr;
        }
    };
} // namespace engine
} // namespace spright
