#include "./renderer2d.h"

namespace spright { namespace engine {
	Renderer2D::Renderer2D() {}

	Renderer2D::Renderer2D(const Renderer2D& that): m_TransformationStack(that.m_TransformationStack), m_IndexCount(that.m_IndexCount) {
		if (m_TransformationStack.size() > 0) {
			m_TransformationBack = &m_TransformationStack.back();
		}
	}

	Renderer2D& Renderer2D::operator=(Renderer2D& that) {
		m_IndexCount = that.m_IndexCount;
		m_TransformationStack = that.m_TransformationStack;
		if (m_TransformationStack.size() > 0) {
			m_TransformationBack = &m_TransformationStack.back();
		}

		return *this;
	}

	Renderer2D::~Renderer2D() {}

	void Renderer2D::push(const Mat4& matrix, bool override) {
		if (override) {
			m_TransformationStack.push_back(matrix);
		}
		else {
			m_TransformationStack.push_back(m_TransformationStack.back() * matrix);
		}
		m_TransformationBack = &m_TransformationStack.back();
	}

	void Renderer2D::pop() {
		if (m_TransformationStack.size() > 1) {
			m_TransformationStack.pop_back();
		}

		m_TransformationBack = &m_TransformationStack.back();
	}

	const spright::maths::Mat4* Renderer2D::getTransformation() {
		return m_TransformationBack;
	}
}}