#include "layer.h"

namespace spright { namespace engine {

	Layer::Layer(Renderer2D* renderer, Shader* shader)
		: m_Renderer(renderer), m_Shader(shader) {
	}
	Layer::~Layer() {
		delete m_Shader;
		delete m_Renderer;

		for (int i = 0; i < m_Renderables.size(); i++) {
			delete m_Renderables[i];
		}
	}

	void Layer::add(Renderable2D* renderable) {
		m_Renderables.push_back(renderable);
	}

	void Layer::remove(Renderable2D* renderable)
	{
		auto it = std::find(m_Renderables.begin(), m_Renderables.end(), renderable);

		if (it != m_Renderables.end())
		{
			m_Renderables.erase(it);
		}
	}

	void Layer::clear() {
		m_Renderables.clear();
	}

	void Layer::render(Camera* camera) {
		m_Shader->enable();

		m_Shader->setUniformMat4("pr_matrix", camera->getProjectionMatrix());

		m_Renderer->begin();
		m_Renderer->push(camera->getView());
		for (const Renderable2D* renderable : m_Renderables) {
			renderable->submit(m_Renderer);
		}
		m_Renderer->end();
		m_Renderer->pop();

		m_Renderer->flush();
	}
} }