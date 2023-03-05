#pragma once

#include <GL/glew.h>
#include <memory>
#include "../../../maths/mat4.h"
#include <vector>
#include "vertex_data.h"
#include "../shader/shader.h"

namespace spright { namespace engine {
	using namespace spright::maths;
	
	class Renderable2D;

	class Renderer2D {
	protected:
		std::vector<Mat4> m_TransformationStack;
		const Mat4* m_TransformationBack = nullptr;

		GLsizei m_IndexCount = 0;
	public:
		Renderer2D();
		Renderer2D(const Renderer2D&);
		virtual ~Renderer2D();

		virtual Renderer2D& operator=(Renderer2D&);
		virtual Renderer2D* clone() const = 0;

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

		virtual Shader& getShader() = 0;
	};
} }