#include "group.h"

namespace engine { namespace graphics {
	Group::Group(const engine::maths::Mat4& transform) : m_TransformationMatrix(transform)
	{
	}

	Group::~Group() {
		for (int i = 0; i < m_Renderables.size(); i++) {
			delete m_Renderables[i];
		}
	}

	void Group::add(engine::graphics::Renderable2D* renderable) {
		m_Renderables.push_back(renderable);
	}

	void Group::submit(Renderer2D* renderer) const {

		renderer->push(m_TransformationMatrix);
		for (const engine::graphics::Renderable2D* renderable : m_Renderables) {
			renderable->submit(renderer);
		}
		renderer->pop();
	}
} }

