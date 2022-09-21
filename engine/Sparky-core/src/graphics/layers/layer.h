#pragma once

#include "../renderable2d.h";
#include "../renderer2d.h";

namespace sparky
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
			float m_PixelSize;

		protected:
			Layer(Renderer2D *renderer, Shader *shader, maths::Mat4 projectionMatrix);

		public:
			virtual ~Layer();
			virtual void add(Renderable2D *renderable);
			virtual void render();
			virtual void clear();
			virtual void remove(Renderable2D* renderable);

			inline float getPixelSize()
			{
				return m_PixelSize;
			}

			inline std::vector<Renderable2D*>& getRenderables() {
				return m_Renderables;
			}
		};
	}
}
