#pragma once

#include "../engine/system/window/window.h"
#include "../engine/system/window/impl/glfw/gl_window.h"
#include "tool/tool_handler.h"
#include "tool/pan_tool.h"
#include "tool/zoom_tool.h"
#include "tool/eraser_tool/eraser_tool.h"
#include "tool/helper/layer_provider_impl.h"
#include "tool/select_tool/select_tool.h"
#include "tool/paint_bucket/paint_bucket_tool.h"
#include "tool/color_picker_tool.h"
#include "document/document_handler.h"
#include "editor_config.h"
#include "core/canvas/canvas_listener_handler.h"
#include "./service/services.h"
#include "./rendering.h"
#include "./service/io/image_export.h"
#include "./service/io/json/json_io.h"
#include "document/document_store.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;

	class Editor
	{
	private:
		Window* m_Window;
		ToolHandler* m_toolHandler;
		CanvasListenerHandler* m_CanvasListenerHandler;
		DocumentHandler* m_DocumentHandler;
		std::unique_ptr<DocumentStore> m_DocumentStore;
		Rendering* m_Rendering;
		spright::Services* m_Services;
		ImageExport* m_ImageExport;
		std::unique_ptr<JsonIO> m_JsonExport;

	public:
		Editor();
		~Editor();

		inline spright::Services* getServices()
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

		inline Window* getWindow() const
		{
			return m_Window;
		}

		inline DocumentHandler* getDocumentHandler()
		{
			return m_DocumentHandler;
		}

		DocumentStore* getDocumentStore();

		Rendering* getRendering();

		inline CanvasListenerHandler* getCanvasListenerHandler()
		{
			return m_CanvasListenerHandler;
		}

		ImageExport* getImageExport();

		JsonIO* getJsonIO();
	};

}}
