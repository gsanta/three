#include "vertexArray.h"

namespace my_app { namespace graphics {
	VertexArray::VertexArray()
	{
		glGenVertexArrays(1, &m_arrayID);
	}

	VertexArray::~VertexArray()
	{
		for (int i = 0; i < m_Buffers.size(); i++) {
			delete m_Buffers[i];
		}

		glDeleteVertexArrays(1, &m_arrayID);
	}

	void VertexArray::addBuffer(Buffer* buffer, GLuint index)
	{
		bind();
		buffer->bind();
		glEnableVertexAttribArray(index);
		glVertexAttribPointer(index, buffer->getComponentCount(), GL_FLOAT, GL_FALSE, 0, 0);
		m_Buffers.push_back(buffer);
		buffer->unbind();
		unbind();
	}

	void VertexArray::bind() const
	{
		glBindVertexArray(m_arrayID);
	}

	void VertexArray::unbind() const
	{
		glBindVertexArray(0);
	}
}}