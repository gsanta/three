#pragma once

#include <string>
#include <nlohmann/json.hpp>
#include <algorithm>
#include "../renderable/renderable2d.h"
#include "../renderer/renderer2d.h"
#include "../camera/camera.h"
#include "dimensions.h"

namespace spright { namespace engine {

	template <typename T>
	class Group
	{
	protected:
		std::vector <T*> m_Renderables;
		Renderer2D* m_Renderer;

	public:
		Group(Renderer2D *renderer);
		Group(const Group&);
		~Group();

		Group& operator=(const Group&);
		T& add(const T& renderable);
		void render(Camera* camera);
		void clear();
		void remove(const T& renderable);

		inline std::vector<T*>& getRenderables() {
			return m_Renderables;
		}
	};

	template <typename T>
	Group<T>::Group(Renderer2D* renderer) : m_Renderer(renderer) {
	}

	template <typename T>
	Group<T>::Group(const Group& group) {
		m_Renderer = group.m_Renderer->clone();
		for (T* item : m_Renderables) {
			m_Renderables.push_back(new T(*item));
		}
	}

	template <typename T>
	Group<T>::~Group() {
		delete m_Renderer;

		for (int i = 0; i < m_Renderables.size(); i++) {
			delete m_Renderables[i];
		}
	}

	template <typename T>
	Group<T>& Group<T>::operator=(const Group<T>& that) {
		if (this != &that) {
			delete m_Renderer;
			for (T* element : m_Renderables)
			{
				delete element;
			}
			m_Renderables.clear();

			m_Renderer = that.m_Renderer->clone();
		}

		return *this;
	}

	template <typename T>
	T& Group<T>::add(const T& renderable) {
		m_Renderables.push_back(new T(renderable));
		return *m_Renderables.back();
	}

	template <typename T>
	void Group<T>::remove(const T& renderable)
	{
		auto it = std::find(m_Renderables.begin(), m_Renderables.end(), &renderable);

		if (it != m_Renderables.end())
		{
			m_Renderables.erase(it);
		}
	}

	template <typename T>
	void Group<T>::clear() {
		// TODO: check if the renderables will be destroyed
		m_Renderables.clear();
	}

	template <typename T>
	void Group<T>::render(Camera* camera) {

		m_Renderer->begin();

		m_Renderer->getShader().setUniformMat4("pr_matrix", camera->getProjectionMatrix());


		m_Renderer->push(camera->getView());
		for (const Renderable2D* renderable : m_Renderables) {
			renderable->submit(m_Renderer);
		}
		m_Renderer->end();
		m_Renderer->pop();

		m_Renderer->flush();
	}

}}
