#include "group.h"

namespace spright { namespace engine {

	Group::Group(Renderer2D* renderer) : m_Renderer(renderer) {
	}

	Group::~Group() {
		delete m_Renderer;

		for (int i = 0; i < m_Renderables.size(); i++) {
			delete m_Renderables[i];
		}
	}

	void Group::add(Renderable2D* renderable) {
		m_Renderables.push_back(renderable);
	}

	void Group::remove(Renderable2D* renderable)
	{
		auto it = std::find(m_Renderables.begin(), m_Renderables.end(), renderable);

		if (it != m_Renderables.end())
		{
			m_Renderables.erase(it);
		}
	}

	void Group::clear() {
		m_Renderables.clear();
	}

	void Group::render(Camera* camera) {

		m_Renderer->begin();
		
		m_Renderer->getShader()->setUniformMat4("pr_matrix", camera->getProjectionMatrix());
		
		
		m_Renderer->push(camera->getView());
		for (const Renderable2D* renderable : m_Renderables) {
			renderable->submit(m_Renderer);
		}
		m_Renderer->end();
		m_Renderer->pop();

		m_Renderer->flush();
	}
} }