#pragma once

#include <string>
#include <GL/glew.h>
#include <FreeImage.h>
#include "../texture/imageLoad.h"

namespace my_app { namespace graphics {

	class Texture {
	private:
		std::string m_Filename;
		GLuint m_TID;
		GLsizei m_Width;
		GLsizei m_Height;

	public:
		Texture(const std::string& filename);
		~Texture();

		void bind() const;
		void unbind() const;

		inline const unsigned int getWidth() const { return m_Width; }
		inline const unsigned int getHeight() const { return m_Height; }
		inline const unsigned int getId() const { return m_TID;  }
	private:
		GLuint load();
	};
} }