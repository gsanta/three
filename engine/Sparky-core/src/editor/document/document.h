#pragma once

#include <vector>
#include "../../graphics/layers/layer.h"
#include "../../graphics/layers/tileLayer.h"
#include "dimensions.h"

namespace my_app { namespace editor { namespace document {

	const std::string USER_LAYER_ID_PREFIX("user_layer_");
	const std::string DEFAULT_TEMP_LAYER_ID("temp_layer_1");
	const std::string DEFAULT_BACKGROUND_LAYER_ID("background_layer_1");

	class Document
	{
	private:
		//my_app::graphics::Layer* m_TempLayer;
		//my_app::graphics::TileLayer* m_BackgroundLayer;
		//my_app::graphics::TileLayer* m_TileLayer;
		std::vector<my_app::graphics::Layer*> m_Layers;

		my_app::graphics::Layer* m_ActiveLayer;

	public:
		Document(my_app_editor::document::Dimensions dimensions);
		~Document();

		my_app_editor::document::Dimensions dimensions;

		my_app::graphics::Layer* getLayer(std::string id);

		void addLayer(my_app::graphics::Layer* layer);

		inline my_app::graphics::Layer* getActiveLayer() {
			return m_ActiveLayer;
		}

		void setActiveLayer(std::string id);

		void render();
	};
}}}


