#pragma once

#include "../engine/system/window/window.h"
#include "../engine/system/window/frame_listener.h"
#include "tool/tool_handler.h"
#include "tool/pan_tool.h"
#include "tool/zoom_tool.h"
#include "document/document_handler.h"
#include "editor_config.h"
#include "core/canvas/canvas_listener_handler.h"
#include "./service/services.h"

namespace spright_app {

	using namespace tool;
	using namespace document;

	class Editor : spright_engine::system::FrameListener {
	private:
		spright_engine::system::Window* m_Window;
		ToolHandler m_toolHandler;
		core::CanvasListenerHandler* m_CanvasListenerHandler;
		DocumentHandler* m_DocumentHandler;
		EditorConfig editorConfig;
		spright_app::Services* m_Services;

	public:

		Editor();
		~Editor();

		inline spright_app::Services* getServices() {
			return m_Services;
		}

		inline ToolHandler& getToolHandler() {
			return m_toolHandler;
		}


		inline void cleanup() {
			 m_Window->getInputHandler()->unRegisterListener(&m_toolHandler);
		}

		inline spright_engine::system::Window* getWindow() const {
			return m_Window;
		}

		inline DocumentHandler* getDocumentHandler() {
			return m_DocumentHandler;
		}

		inline core::CanvasListenerHandler* getCanvasListenerHandler() {
			return m_CanvasListenerHandler;
		}

		void onUpdate(float deltaTime) override;
	};

}