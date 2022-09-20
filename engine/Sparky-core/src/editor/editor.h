#pragma once

#include "../graphics/window/window.h"
#include "tool/tool_handler.h"
#include "document/document_handler.h"
#include "editor_config.h"

namespace my_app { namespace editor {

	using namespace graphics;
	using namespace tool;
	using namespace document;

	class Editor {
	private:
		Window* m_Window;
		ToolHandler* m_toolHandler;
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

		inline Window* getWindow() const {
			return m_Window;
		}

		void onUpdate();
	};

}}