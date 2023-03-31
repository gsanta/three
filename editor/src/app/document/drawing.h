#pragma once

#include "frame_store.h"
#include "../../engine/graphics/camera/camera.h"
#include "../feature/frame/frame_player.h"
#include "../event/event_emitter.h"

namespace spright { namespace editor {

	using namespace ::spright::engine;

	class Drawing : public Container
	{
	private:
		FrameStore m_FrameStore;
		Camera* m_Camera;
		std::unique_ptr<FramePlayer> m_FramePlayer;
		EventEmitter* m_EventEmitter;

	public:
		Drawing(Bounds bounds, Camera* camera, EventEmitter* eventEmitter);
		~Drawing();

		FrameStore& getFrameStore();
		ActiveFrame& getActiveFrame();
		TileLayer& getActiveLayer();

		inline Camera* getCamera() {
			return m_Camera;
		}

		TileLayer& addLayer(const TileLayer& tileLayer);

		TileLayer& getForegroundLayer();
		TileLayer& getBackgroundLayer();

		std::string getJson();

		void render();
		FramePlayer& getFramePlayer();
	};
}}