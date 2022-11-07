#pragma once

#include <vector>
#include "../../engine/graphics/layer/layer.h"
#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/camera/camera.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "dimensions.h"

namespace spright_app { namespace document {

	const std::string USER_LAYER_ID_PREFIX("user_layer_");
	const std::string DEFAULT_TEMP_LAYER_ID("temp_layer_1");
	const std::string DEFAULT_BACKGROUND_LAYER_ID("background_layer_1");

	class Document
	{
	private:
		//spright_engine::graphics::Layer* m_TempLayer;
		//spright_engine::graphics::TileLayer* m_BackgroundLayer;
		//spright_engine::graphics::TileLayer* m_TileLayer;
		std::vector<spright_engine::graphics::Layer*> m_Layers;

		spright_engine::graphics::Layer* m_ActiveLayer;

		spright_engine::graphics::Camera* m_Camera;

	public:
		Document(spright_app::document::Dimensions dimensions);
		~Document();

		spright_app::document::Dimensions dimensions;

		spright_engine::graphics::Layer* getLayer(std::string id);

		void addLayer(spright_engine::graphics::Layer* layer);

		inline spright_engine::graphics::Layer* getActiveLayer() {
			return m_ActiveLayer;
		}

		inline spright_engine::graphics::Camera* getCamera() {
			return m_Camera;
		}

		std::string getJson();

		void setActiveLayer(std::string id);

		void render();
	};
}}


