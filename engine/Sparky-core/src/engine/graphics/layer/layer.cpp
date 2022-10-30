#include "layer.h"

namespace spright_engine { namespace graphics {

	Layer::Layer(std::string id, Renderer2D* renderer, Shader* shader, spright_engine::maths::Mat4 projectionMatrix, Camera* camera)
		: m_Id(id), m_Renderer(renderer), m_Shader(shader), m_ProjectionMatrix(projectionMatrix), m_Camera(camera) {

		m_Shader->enable();
		m_Shader->setUniformMat4("pr_matrix", m_ProjectionMatrix);
		m_Shader->disable();
	}

	Layer::~Layer() {
		delete m_Shader;
		delete m_Renderer;

		for (int i = 0; i < m_Renderables.size(); i++) {
			delete m_Renderables[i];
		}
	}

	void Layer::add(spright_engine::graphics::Renderable2D* renderable) {
		m_Renderables.push_back(renderable);
	}

	void Layer::remove(spright_engine::graphics::Renderable2D* renderable)
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

	void Layer::render() {
		m_Shader->enable();

		m_Renderer->begin();
		m_Renderer->push(m_Camera->getView());
		for (const spright_engine::graphics::Renderable2D* renderable : m_Renderables) {
			renderable->submit(m_Renderer);
		}
		m_Renderer->end();
		m_Renderer->pop();

		m_Renderer->flush();
	}
} }