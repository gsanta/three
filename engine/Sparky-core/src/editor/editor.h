#pragma once

#include "../engine/system/window/window.h"
#include "../engine/system/window/frame_listener.h"
#include "tool/tool_handler.h"
#include "document/document_handler.h"
#include "editor_config.h"
#include "core/canvas/canvas_listener_handler.h"

namespace my_app { namespace editor {

	using namespace tool;
	using namespace document;

	class Editor : my_app_engine::system::FrameListener {
	private:
		my_app_engine::system::Window* m_Window;
		ToolHandler* m_toolHandler;
		core::CanvasListenerHandler* m_CanvasListenerHandler;
		DocumentHandler* m_DocumentHandler;
		EditorConfig editorConfig;

	public:

		Editor();
		~Editor();

		inline ToolHandler* getToolHandler() const {
			return m_toolHandler;
		}

		inline void cleanup() {
			 m_Window->getInputHandler()->unRegisterListener(m_toolHandler);
		}

		inline my_app_engine::system::Window* getWindow() const {
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

}}