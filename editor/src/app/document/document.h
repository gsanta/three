#pragma once

#include <vector>
#include <algorithm>
#include <memory>
#include "../../engine/graphics/layer/group.h"
#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/camera/camera.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "../../engine/graphics/layer/dimensions.h"
#include "../../engine/layout/container.h"
#include "layer_handler.h"
#include "frame_store.h"

namespace spright { namespace editor {

	using namespace ::spright::engine;

	const std::string USER_LAYER_ID_PREFIX("user_layer_");
	const std::string DEFAULT_TEMP_LAYER_ID("temp_layer_1");
	const std::string DEFAULT_BACKGROUND_LAYER_ID("background_layer_1");

	class Document : public Container
	{
	private:
		std::unique_ptr<LayerHandler> m_LayerHandler;
		FrameStore m_FrameStore;
		Camera* m_Camera;

	public:
		Document(Dimensions dimensions, Camera* camera);
		~Document();

		FrameStore& getFrameStore();
		ActiveFrame& getActiveFrame();
		TileLayer& getActiveLayer();

		inline Camera* getCamera() {
			return m_Camera;
		}

		std::string getJson();

		void render();
	};
}}


