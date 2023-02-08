#pragma once

#include <string>
#include <nlohmann/json.hpp>
#include <algorithm>
#include "../renderable/renderable2d.h"
#include "../renderer/renderer2d.h"
#include "../camera/camera.h";
#include "dimensions.h"

namespace engine
{
	namespace graphics
	{
		class Layer
		{
		protected:
			Renderer2D *m_Renderer;
			std::vector <engine::graphics::Renderable2D*> m_Renderables;
			Shader *m_Shader;
			Camera* m_Camera;	
			std::string m_Id;
			std::string m_Name;
			bool m_IsEnabled = true;
			Dimensions m_CameraDim;

		protected:
			Layer(std::string name, std::string id, Renderer2D *renderer, Shader *shader, Camera* camera, Dimensions dimensions);

		public:
			virtual ~Layer();
			virtual void add(engine::graphics::Renderable2D *renderable);
			virtual void render();
			virtual void clear();
			virtual void remove(engine::graphics::Renderable2D* renderable);

			nlohmann::json getLayerDescription();

			virtual nlohmann::json getJson() = 0;
			virtual void setJson(std::string json) = 0;

			inline void setEnabled(bool isEnabled) {
				m_IsEnabled = isEnabled;
			}

			inline bool isEnabled() {
				return m_IsEnabled;
			}

			inline std::string getId() {
				return m_Id;
			}

			inline Shader* getShader() {
				return m_Shader;
			}

			inline std::vector<engine::graphics::Renderable2D*>& getRenderables() {
				return m_Renderables;
			}
		};
	}
}
