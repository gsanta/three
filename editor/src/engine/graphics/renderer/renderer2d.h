#pragma once

#include <GL/glew.h>
#include "../../../maths/mat4.h"
#include <vector>
#include "vertex_data.h"

namespace spright { namespace engine {
	using namespace spright::maths;
	
	class Renderable2D;

	class Renderer2D {
	protected:
		std::vector<Mat4> m_TransformationStack;
		const Mat4* m_TransformationBack;

		GLsizei m_IndexCount = 0;

		Renderer2D() {
			m_TransformationStack.push_back(Mat4::identity());
			m_TransformationBack = &m_TransformationStack.back();
		}
	public:
		void push(const Mat4& matrix, bool override = false);
		void pop();
		const spright::maths::Mat4* getTransformation();

		inline GLsizei getIndexCount() {
			return m_IndexCount;
		}

		inline void setIndexCount(GLsizei indexCount) {
			m_IndexCount = indexCount;
		}

		virtual void flush() = 0;
		virtual void begin() = 0;
		virtual void end() = 0;
		virtual VertexData*& getBuffer() = 0;
	};
} }