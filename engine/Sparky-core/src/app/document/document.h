#pragma once

#include <vector>
#include "../../engine/graphics/layer/layer.h"
#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/camera/camera.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "../../engine/graphics/layer/dimensions.h"

namespace spright { namespace document {

	using namespace ::engine::graphics;

	const std::string USER_LAYER_ID_PREFIX("user_layer_");
	const std::string DEFAULT_TEMP_LAYER_ID("temp_layer_1");
	const std::string DEFAULT_BACKGROUND_LAYER_ID("background_layer_1");

	class Document
	{
	private:
		//engine::graphics::Layer* m_TempLayer;
		//engine::graphics::TileLayer* m_BackgroundLayer;
		//engine::graphics::TileLayer* m_TileLayer;
		std::vector<engine::graphics::Layer*> m_Layers;
		std::vector<engine::graphics::Layer*> m_BeforeLayers;
		std::vector<engine::graphics::Layer*> m_AfterLayers;

		engine::graphics::Layer* m_ActiveLayer;

		Camera* m_Camera;

	public:
		Document(engine::graphics::Dimensions dimensions, Camera* camera);
		~Document();

		engine::graphics::Dimensions dimensions;

		engine::graphics::Layer* getLayer(std::string id);

		void addUserLayer(engine::graphics::Layer* layer);
		void addBeforeLayer(engine::graphics::Layer* layer);
		void addAfterLayer(engine::graphics::Layer* layer);

		std::vector<engine::graphics::Layer*>& getUserLayers();

		inline engine::graphics::Layer* getActiveLayer() {
			return m_ActiveLayer;
		}

		inline engine::graphics::Camera* getCamera() {
			return m_Camera;
		}

		std::string getJson();

		void setActiveLayer(std::string id);

		void render();
	};
}}


