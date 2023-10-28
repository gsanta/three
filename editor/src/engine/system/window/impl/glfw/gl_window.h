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

#define MAX_KEYS 1024
#define MAX_BUTTONS 3

    class GLWindow : public Window
    {
    public:
        GLWindow(const char *title, int width, int height);

        ~GLWindow();

        void clear() const;

        float beforeRender();

        void afterRender();

        bool closed() const;

        void setSize(int width, int height);

        bool isKeyPressed(unsigned int keycode) const;

        bool isMouseButtonPressed(unsigned int button) const;

        void getMousePosition(double &x, double &y) const;

        float getRatio();

        InputHandler *getInputHandler() const;

    private:
        bool init();

        friend void window_resize(GLFWwindow *window, int width, int height);

        void static key_callback(GLFWwindow *window, int key, int scancode, int action, int mods);

        void static mouse_input_callback(GLFWwindow *window, int button, int action, int mods);

        void static cursor_position_callback(GLFWwindow *window, double xpos, double ypos);

        void static scroll_callback(GLFWwindow *window, double xoffset, double yoffset);

    private:
        friend struct GLFWwindow;

        InputHandler *m_InputHandler;

        const char *m_Title;

        GLFWwindow *m_Window;

        bool m_Closed;

        bool m_Keys[MAX_KEYS];

        bool m_MouseButtons[MAX_BUTTONS];

        double m_x, m_y;

        float lastFrame;
    };
} // namespace engine
} // namespace spright
