#pragma once

#include <string>
#include "../renderable/renderable2d.h"
#include "../renderer/renderer2d.h"
#include "../camera/camera.h";

namespace my_app_engine
{
	namespace graphics
	{
		class Layer
		{
		protected:
			Renderer2D *m_Renderer;
			std::vector <my_app_engine::graphics::Renderable2D*> m_Renderables;
			Shader *m_Shader;
			my_app_engine::maths::Mat4 m_ProjectionMatrix;
			Camera* m_Camera;	
			std::string m_Id;

		protected:
			Layer(std::string id, Renderer2D *renderer, Shader *shader, my_app_engine::maths::Mat4 projectionMatrix, Camera* camera);

		public:
			virtual ~Layer();
			virtual void add(my_app_engine::graphics::Renderable2D *renderable);
			virtual void render();
			virtual void clear();
			virtual void remove(my_app_engine::graphics::Renderable2D* renderable);

			virtual std::string getJson() = 0;
			virtual void setJson(std::string json) = 0;

			inline std::string getId() {
				return m_Id;
			}

			inline Shader* getShader() {
				return m_Shader;
			}

			inline std::vector<my_app_engine::graphics::Renderable2D*>& getRenderables() {
				return m_Renderables;
			}
		};
	}
}
