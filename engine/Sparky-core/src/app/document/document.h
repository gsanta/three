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
		std::vector<Layer*> m_Layers;
		std::vector<Layer*> m_BeforeLayers;
		std::vector<Layer*> m_AfterLayers;

		Layer* m_ActiveLayer;

		Camera* m_Camera;

	public:
		Document(Dimensions dimensions, Camera* camera);
		~Document();

		Dimensions dimensions;

		Layer* getLayer(std::string id);

		void addUserLayer(Layer* layer);
		void addBeforeLayer(Layer* layer);
		void addAfterLayer(Layer* layer);

		std::vector<Layer*>& getUserLayers();

		void setLayerIndex(std::string layerId, int newIndex);
		int getLayerIndex(std::string layerId);
		void removeLayer(std::string layerId);

		inline Layer* getActiveLayer() {
			if (m_ActiveLayer == nullptr) {
				throw "No active layer for the current document";
			}

			return m_ActiveLayer;
		}

		inline Camera* getCamera() {
			return m_Camera;
		}

		std::string getJson();

		void setActiveLayer(std::string layerId);

		void render();
	};
}}


