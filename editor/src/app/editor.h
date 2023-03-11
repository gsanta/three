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
#include "event/event_emitter.h"
#include "document/document_store.h"
#include "api/emscripten_event_emitter.h"
#include "document/active_frame.h"
#include "document/frame_store.h"

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
		std::unique_ptr<EventEmitter> m_EventEmitter;
		FrameStore m_FrameStore;

	public:
		Editor();
		~Editor();

		Window* getWindow() const;
		DocumentStore* getDocumentStore();
		DocumentHandler* getDocumentHandler();
		Document* getActiveDocument();
		ActiveFrame& getActiveFrame();
		TileLayer& getActiveLayer();
		ToolHandler* getToolHandler();
		Rendering* getRendering();
		ImageExport* getImageExport();
		JsonIO* getJsonIO();
	};

}}
