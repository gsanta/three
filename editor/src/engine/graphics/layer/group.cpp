//#include "group.h"
//
//namespace spright { namespace engine {
//	template <typename T>
//	Group<T>::Group(Renderer2D* renderer) : m_Renderer(renderer) {
//	}
//
//	template <typename T>
//	Group<T>::~Group() {
//		delete m_Renderer;
//
//		for (int i = 0; i < m_Renderables.size(); i++) {
//			delete m_Renderables[i];
//		}
//	}
//
//	template <typename T>
//	void Group<T>::add(T* renderable) {
//		m_Renderables.push_back(renderable);
//	}
//
//	template <typename T>
//	void Group<T>::remove(T* renderable)
//	{
//		auto it = std::find(m_Renderables.begin(), m_Renderables.end(), renderable);
//
//		if (it != m_Renderables.end())
//		{
//			m_Renderables.erase(it);
//		}
//	}
//
//	template <typename T>
//	void Group<T>::clear() {
//		// TODO: check if the renderables will be destroyed
//		m_Renderables.clear();
//	}
//
//	template <typename T>
//	void Group<T>::render(Camera* camera) {
//
//		m_Renderer->begin();
//		
//		m_Renderer->getShader()->setUniformMat4("pr_matrix", camera->getProjectionMatrix());
//		
//		
//		m_Renderer->push(camera->getView());
//		for (const Renderable2D* renderable : m_Renderables) {
//			renderable->submit(m_Renderer);
//		}
//		m_Renderer->end();
//		m_Renderer->pop();
//
//		m_Renderer->flush();
//	}
//} }