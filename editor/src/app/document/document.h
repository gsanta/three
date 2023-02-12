#pragma once

#include <vector>
#include <algorithm>
#include "../../engine/graphics/layer/layer.h"
#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/camera/camera.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "../../engine/graphics/layer/dimensions.h"
#include "../../engine/layout/container.h"
#include "layer_handler.h"

namespace spright { namespace editor {

	using namespace ::spright::engine;

	const std::string USER_LAYER_ID_PREFIX("user_layer_");
	const std::string DEFAULT_TEMP_LAYER_ID("temp_layer_1");
	const std::string DEFAULT_BACKGROUND_LAYER_ID("background_layer_1");

	class Document : public Container
	{
	private:
		std::unique_ptr<LayerHandler> m_LayerHandler;
		Camera* m_Camera;

	public:
		Document(Dimensions dimensions, Camera* camera);
		~Document();

		Dimensions dimensions;

		LayerHandler* getLayerHandler();

		inline Camera* getCamera() {
			return m_Camera;
		}

		std::string getJson();

		void render();
	};
}}


