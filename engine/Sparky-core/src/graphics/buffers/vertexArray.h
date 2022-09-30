#pragma once

#include <vector>
#include <GL/glew.h>
#include "buffer.h"

namespace my_app { namespace graphics {

	class VertexArray {
	private:
		GLuint m_arrayID;
		std::vector<Buffer*> m_Buffers;
	public:
		VertexArray();
		~VertexArray();
		
		void addBuffer(Buffer* buffer, GLuint index);
		void bind() const;
		void unbind() const;
	};
} }