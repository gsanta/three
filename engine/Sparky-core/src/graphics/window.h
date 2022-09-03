#pragma once

#include <iostream>
#include <GL/glew.h>
#include <GLFW/glfw3.h>

namespace sparky {
	namespace graphics {

#define MAX_KEYS 1024
#define MAX_BUTTONS 32

		class Window {
		private:
			friend struct GLFWwindow;
			int m_Width, m_Height;
			const char* m_Title;
			GLFWwindow* m_Window;
			bool m_Closed;

			bool m_Keys[MAX_KEYS];
			bool m_MouseButtons[MAX_BUTTONS];
			double m_x, m_y;
		public:
			Window(const char* title, int width, int height);
			~Window();
			void clear() const;
			void update();
			bool closed() const;

			inline int getWidth() const { return m_Width; }
			inline int getHeight() const { return m_Height; }
		
			bool isKeyPressed(unsigned int keycode) const;
			bool isMouseButtonPressed(unsigned int button) const;
			void getMousePosition(double& x, double& y) const;
		private:
			bool init();
			void static key_callback(GLFWwindow* window, int key, int scancode, int action, int mods);
			void static mouse_input_callback(GLFWwindow* window, int button, int action, int mods);
			void static cursor_position_callback(GLFWwindow* window, double xpos, double ypos);
		};
	}
}