#include "layer.h"

namespace spright_engine { namespace graphics {

	Layer::Layer(std::string name, std::string id, Renderer2D* renderer, Shader* shader, Camera* camera, Dimensions dimensions)
		: m_Name(name), m_Id(id), m_Renderer(renderer), m_Shader(shader), m_Camera(camera), m_Dimensions(dimensions) {
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

	nlohmann::json Layer::getLayerDescription() {
		nlohmann::json json = {
			{"id", m_Id},
			{"name", m_Name},
		};

		return json;
	}

	void Layer::clear() {
		m_Renderables.clear();
	}

	void Layer::render() {
		if (!m_IsEnabled) {
			return;
		}

		m_Shader->enable();

		m_Shader->setUniformMat4("pr_matrix", m_Camera->getProjectionMatrix());

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