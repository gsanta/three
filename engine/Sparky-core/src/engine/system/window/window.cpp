#include "window.h"

namespace spright_engine { namespace system {

		void window_resize(GLFWwindow* window, int width, int height);

		Window::Window(const char* title, int width, int height) {
			m_Title = title;
			m_Width = width;
			m_Height = height;
			if (!init()) {
				glfwTerminate();
			}

			m_InputHandler = new InputHandler(this);
			m_FrameHandler = new FrameHandler();

			for (int i = 0; i < MAX_KEYS; i++) {
				m_Keys[i] = false;
			}
			for (int i = 0; i < MAX_BUTTONS; i++) {
				m_MouseButtons[i] = false;
			}
		}

		Window::~Window()
		{
			delete m_InputHandler;
			delete m_FrameHandler;
			glfwTerminate();
		}

		bool Window::init() {

			if (!glfwInit()) {
				std::cout << "Failed to initialize GLFW!" << std::endl;
				return false;
			}
			m_Window = glfwCreateWindow(m_Width, m_Height, m_Title, NULL, NULL);
			if (!m_Window) {
				glfwTerminate();
				std::cout << "Failed to create GLWF window!" << std::endl;
				return false;
			}
			glfwMakeContextCurrent(m_Window);
			glfwSetWindowUserPointer(m_Window, this);
			glfwSetFramebufferSizeCallback(m_Window, window_resize);
			glfwSetKeyCallback(m_Window, key_callback);
			glfwSetMouseButtonCallback(m_Window, mouse_input_callback);
			glfwSetCursorPosCallback(m_Window, cursor_position_callback);
			glfwSetScrollCallback(m_Window, scroll_callback);
			glfwSwapInterval(0);

			if (glewInit() != GLEW_OK) {
				std::cout << "Could not initialize GLEW!" << std::endl;
				return false;
			}

			return true;
		}

		void Window::setSize(int width, int height)
		{
			glfwSetWindowSize(m_Window, width, height);
		}

		bool Window::isKeyPressed(unsigned int keycode) const
		{
			// TODO: log this
			if (keycode >= MAX_KEYS) {
				return false;
			}
			return m_Keys[keycode];
		}

		bool Window::isMouseButtonPressed(unsigned int button) const {
			// TODO: log this
			if (button >= MAX_BUTTONS) {
				return false;
			}
			return m_MouseButtons[button];
		}

		void Window::getMousePosition(double& x, double& y) const {
			x = m_x;
			y = m_y;
		}

		InputHandler* Window::getInputHandler() const
		{
			return this->m_InputHandler;
		}

		FrameHandler* Window::getFrameHandler() const
		{
			return m_FrameHandler;
		}

		void Window::mouse_input_callback(GLFWwindow* window, int button, int action, int mods) {
			Window* win = (Window*)glfwGetWindowUserPointer(window);

			if (action == GLFW_PRESS) {
				win->getInputHandler()->emitMouseDown(button);
			}
			else {
				win->getInputHandler()->emitMouseUp(button);
			}
			win->m_MouseButtons[button] = action != GLFW_RELEASE;
		}


		void Window::key_callback(GLFWwindow* window, int key, int scancode, int action, int mods)
		{
			Window* win = (Window*) glfwGetWindowUserPointer(window);
			win->m_Keys[key] = action != GLFW_RELEASE;
		}

		void Window::cursor_position_callback(GLFWwindow* window, double xpos, double ypos) {
			Window* win = (Window*)glfwGetWindowUserPointer(window);
			win->m_x = xpos;
			win->m_y = ypos;

			win->getInputHandler()->emitMouseMove(xpos, ypos);
		}

		void Window::scroll_callback(GLFWwindow* window, double xoffset, double yoffset)
		{
			Window* win = (Window*)glfwGetWindowUserPointer(window);

			win->getInputHandler()->emitScroll(xoffset, yoffset);
		}

		void Window::clear() const
		{
			glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
		}

		void Window::update() {
			float currentFrame = glfwGetTime();
			float deltaTime = currentFrame - lastFrame;
			lastFrame = currentFrame;
			m_FrameHandler->emitUpdate(deltaTime);

			if (this->m_Callback != nullptr) {
				this->m_Callback(deltaTime);
			}
			GLenum error = glGetError();

			if (error != GL_NO_ERROR) {
				std::cout << "OpenGL error: " << error << std::endl;
			}

			glfwPollEvents();
			glfwGetFramebufferSize(m_Window, &m_Width, &m_Height);
			glfwSwapBuffers(m_Window);
		}

		void Window::onUpdate(std::function<void(float)> callback)
		{
			m_Callback = callback;
		}
		
		bool Window::closed() const
		{
			return glfwWindowShouldClose(m_Window) == 1;
		}

		void window_resize(GLFWwindow* window, int width, int height)
		{
			glViewport(0, 0, width, height);
			Window* win = (Window*)glfwGetWindowUserPointer(window);
			win->m_Width = width;
			win->m_Height = height;
		}

		//void window_resize(GLFWwindow* window, int width, int height) {
		//	glViewport(0, 0, width, height);
		//	Window* win = (Window*)glfwGetWindowUserPointer(window);
		//	win->m_Width = width;
		//	win->m_Height = height;
		//}
	}
}