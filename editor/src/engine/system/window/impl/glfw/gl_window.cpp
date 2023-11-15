#include "gl_window.h"

namespace spright
{
namespace engine
{

    void window_resize(GLFWwindow *window, int width, int height);

    GLWindow::GLWindow(const char *title, int width, int height) : Window(width, height)
    {
        m_Title = title;
        m_Width = width;
        m_Height = height;
        if (!init())
        {
            glfwTerminate();
        }

        m_InputHandler = new InputHandler();

        for (int i = 0; i < MAX_KEYS; i++)
        {
            m_Keys[i] = false;
        }
        for (int i = 0; i < MAX_BUTTONS; i++)
        {
            m_MouseButtons[i] = false;
        }
    }

    GLWindow::~GLWindow()
    {
        delete m_InputHandler;
        glfwTerminate();
    }

    bool GLWindow::init()
    {
        if (!glfwInit())
        {
            std::cout << "Failed to initialize GLFW!" << std::endl;
            return false;
        }
        // mac needs these hints
        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
        glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GLFW_TRUE);
        glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
        m_Window = glfwCreateWindow(m_Width, m_Height, m_Title, NULL, NULL);
        if (!m_Window)
        {
            glfwTerminate();
            std::cout << "Failed to create GLWF window!" << std::endl;
            return false;
        }
        // glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        // glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
        // glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GLFW_TRUE);
        // glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

        glfwMakeContextCurrent(m_Window);
        glfwSetWindowUserPointer(m_Window, this);
        glfwSetFramebufferSizeCallback(m_Window, window_resize);
        glfwSetKeyCallback(m_Window, key_callback);
        glfwSetMouseButtonCallback(m_Window, mouse_input_callback);
        glfwSetCursorPosCallback(m_Window, cursor_position_callback);
        glfwSetScrollCallback(m_Window, scroll_callback);
        glfwSwapInterval(0);
        glewExperimental = GL_TRUE;

        if (glewInit() != GLEW_OK)
        {
            std::cout << "Could not initialize GLEW!" << std::endl;
            return false;
        }

        return true;
    }

    void GLWindow::setSize(int width, int height)
    {
        glfwSetWindowSize(m_Window, width, height);
        Window::setSize(width, height);
    }

    bool GLWindow::isKeyPressed(unsigned int keycode) const
    {
        if (keycode >= MAX_KEYS)
        {
            return false;
        }
        return m_Keys[keycode];
    }

    bool GLWindow::isMouseButtonPressed(unsigned int button) const
    {
        if (button >= MAX_BUTTONS)
        {
            return false;
        }
        return m_MouseButtons[button];
    }

    void GLWindow::getMousePosition(double &x, double &y) const
    {
        x = m_x;
        y = m_y;
    }

    float GLWindow::getRatio()
    {
        return (float)m_Width / (float)m_Height;
    }

    InputHandler *GLWindow::getInputHandler() const
    {
        return this->m_InputHandler;
    }

    void GLWindow::mouse_input_callback(GLFWwindow *window, int button, int action, int mods)
    {
        GLWindow *win = (GLWindow *)glfwGetWindowUserPointer(window);

        win->m_MouseButtons[button] = action != GLFW_RELEASE;

        if (action == GLFW_PRESS)
        {
            win->getInputHandler()->emitMouseDown(win->m_MouseButtons);
        }
        else
        {
            win->getInputHandler()->emitMouseUp(win->m_MouseButtons);
        }
    }


    void GLWindow::key_callback(GLFWwindow *window, int key, int scancode, int action, int mods)
    {
        GLWindow *win = (GLWindow *)glfwGetWindowUserPointer(window);
        win->m_Keys[key] = action != GLFW_RELEASE;

        win->getInputHandler()->emitKeyChange(key, action != GLFW_RELEASE);
    }

    void GLWindow::cursor_position_callback(GLFWwindow *window, double xpos, double ypos)
    {
        GLWindow *win = (GLWindow *)glfwGetWindowUserPointer(window);
        win->m_x = xpos;
        win->m_y = ypos;

        win->getInputHandler()->emitMouseMove(xpos, ypos);
    }

    void GLWindow::scroll_callback(GLFWwindow *window, double xoffset, double yoffset)
    {
        GLWindow *win = (GLWindow *)glfwGetWindowUserPointer(window);

        win->getInputHandler()->emitScroll(xoffset, yoffset);
    }

    void GLWindow::clear() const
    {
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    }

    float GLWindow::beforeRender()
    {
        float currentFrame = glfwGetTime();
        float deltaTime = currentFrame - lastFrame;
        lastFrame = currentFrame;
        GLenum error = glGetError();

        if (error != GL_NO_ERROR)
        {
            std::cout << "OpenGL error: " << error << std::endl;
        }

        return deltaTime;
    }

    void GLWindow::afterRender()
    {
        glfwPollEvents();
        glfwGetFramebufferSize(m_Window, &m_Width, &m_Height);
        glfwSwapBuffers(m_Window);
    }

    bool GLWindow::closed() const
    {
        return glfwWindowShouldClose(m_Window) == 1;
    }

    void window_resize(GLFWwindow *window, int width, int height)
    {
        glViewport(0, 0, width, height);
        GLWindow *win = (GLWindow *)glfwGetWindowUserPointer(window);
        win->m_Width = width;
        win->m_Height = height;

        for (WindowResizedListener *listener : win->m_Listeners)
        {
            listener->onWindowSizeChanged(width, height);
        }
    }
} // namespace engine
} // namespace spright
