#pragma once

#include <vector>
#include <algorithm>
#include <memory>
#include "../../engine/graphics/layer/group.h"
#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/camera/camera.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "../../engine/graphics/renderable/bounds.h"
#include "../../engine/layout/container.h"
#include "frame_store.h"
#include "../event/event_emitter.h"
#include "../feature/frame/frame_player.h"

namespace spright { namespace editor {

	using namespace ::spright::engine;

	class Document : public Container
	{
	private:
		FrameStore m_FrameStore;
		Camera* m_Camera;
		std::unique_ptr<FramePlayer> m_FramePlayer;
		EventEmitter* m_EventEmitter;

	public:
		Document(Bounds bounds, Camera* camera, EventEmitter* eventEmitter);
		~Document();

		FrameStore& getFrameStore();
		ActiveFrame& getActiveFrame();
		TileLayer& getActiveLayer();

		inline Camera* getCamera() {
			return m_Camera;
		}

		std::string getJson();

		void render();
		FramePlayer& getFramePlayer();
	};
}}


