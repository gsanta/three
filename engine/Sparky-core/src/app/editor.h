#pragma once

#include "../engine/system/window/window.h"
#include "tool/tool_handler.h"
#include "tool/pan_tool.h"
#include "tool/zoom_tool.h"
#include "tool/select_tool/select_tool.h"
#include "tool/paint_bucket/paint_bucket_tool.h"
#include "tool/color_picker_tool.h"
#include "document/document_handler.h"
#include "editor_config.h"
#include "core/canvas/canvas_listener_handler.h"
#include "./service/services.h"
#include "./rendering.h"
#include "./service/io/image_export.h"

namespace spright
{

	using namespace tool;
	using namespace document;
	using namespace ::engine::system;

	class Editor
	{
	private:
		Window *m_Window;
		ToolHandler* m_toolHandler;
		core::CanvasListenerHandler *m_CanvasListenerHandler;
		DocumentHandler *m_DocumentHandler;
		Rendering* m_Rendering;
		EditorConfig editorConfig;
		spright::Services *m_Services;
		ImageExport* m_ImageExport;

	public:
		Editor();
		~Editor();

		inline spright::Services *getServices()
		{
			return m_Services;
		}

		inline ToolHandler* getToolHandler()
		{
			return m_toolHandler;
		}

		inline void cleanup()
		{
			m_Window->getInputHandler()->unRegisterListener(m_toolHandler);
		}

		inline Window *getWindow() const
		{
			return m_Window;
		}

		inline DocumentHandler *getDocumentHandler()
		{
			return m_DocumentHandler;
		}

		Rendering* getRendering();

		inline core::CanvasListenerHandler *getCanvasListenerHandler()
		{
			return m_CanvasListenerHandler;
		}

		ImageExport* getImageExport();
	};

}
