#pragma once

#include <iostream>
#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <functional>
#include "../../input_handler.h"
#include "../../window.h"

namespace spright { namespace engine {


	class HeadlessWindow : public Window {
	private:
		int m_Width, m_Height;
	public:
		inline HeadlessWindow(int width, int height) : m_Width(width), m_Height(height), Window(width, height) {}
		inline void clear() const {}
		inline float beforeRender() { return 0; }
		inline void afterRender() {}
		inline bool closed() const { return false; }

		inline int getWidth() const { return m_Width; }
		inline int getHeight() const { return m_Height; }
		inline void setSize(int width, int height) {
			m_Width = width;
			m_Height = height;
		}

		bool isKeyPressed(unsigned int keycode) const { return false; }
		bool isMouseButtonPressed(unsigned int button) const { return false;  }
		void getMousePosition(double& x, double& y) const {}
		float getRatio() { return m_Width / m_Height;  }

		InputHandler* getInputHandler() const { return nullptr; }
	};
}}

