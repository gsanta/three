#pragma once

#include <string>
#include "../renderable2d.h"
#include "../renderer2d.h"

namespace my_app
{
	namespace graphics
	{
		class Layer
		{
		protected:
			Renderer2D *m_Renderer;
			std::vector<Renderable2D *> m_Renderables;
			Shader *m_Shader;
			maths::Mat4 m_ProjectionMatrix;
			std::string m_Id;

		protected:
			Layer(std::string id, Renderer2D *renderer, Shader *shader, maths::Mat4 projectionMatrix);

		public:
			virtual ~Layer();
			virtual void add(Renderable2D *renderable);
			virtual void render();
			virtual void clear();
			virtual void remove(Renderable2D* renderable);

			inline std::string getId() {
				return m_Id;
			}

			inline std::vector<Renderable2D*>& getRenderables() {
				return m_Renderables;
			}
		};
	}
}
