#pragma once

#include "../engine/system/window/impl/glfw/gl_window.h"
#include "../engine/system/window/window.h"
#include "./rendering/rendering.h"
#include "./service/io/image_export.h"
#include "./service/io/json/json_io.h"
#include "./service/services.h"
#include "api/emscripten_event_emitter.h"
#include "core/canvas/canvas_listener_handler.h"
#include "core/run_loop/run_loop.h"
#include "document/document_store.h"
#include "document/factory/document_factory.h"
#include "document/factory/gl_renderer_provider.h"
#include "editor_config.h"
#include "event/event_emitter.h"
#include "feature/frame/frame_player.h"
#include "tool/circle_tool/circle_tool.h"
#include "tool/color_picker_tool.h"
#include "tool/eraser_tool/eraser_tool.h"
#include "tool/line_tool/line_tool.h"
#include "tool/paint_bucket/paint_bucket_tool.h"
#include "tool/pan_tool.h"
#include "tool/select_tool/select_tool.h"
#include "tool/tool_handler.h"
#include "tool/tools/shear_tool/shear_tool.h"
#include "tool/zoom_tool.h"

#include <vector>

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class Editor
    {
    public:
        explicit Editor(RunLoop runLoop);

        ~Editor();

        void init();

        Window *getWindow() const;

        DocumentStore *getDocumentStore();

        DocumentFactory *getDocumentFactory();

        Document &getActiveDocument();

        void setDocument(const Document &document);

        ToolHandler *getToolHandler();

        Rendering *getRendering();

        ImageExport *getImageExport();

        JsonIO *getJsonIO();

        RunLoop &getRunLoop();

        FramePlayer &getFramePlayer();

    private:
        Window *m_Window;

        ToolHandler *m_toolHandler;

        CanvasListenerHandler *m_CanvasListenerHandler;

        DocumentFactory *m_DocumentFactory;

        std::shared_ptr<DocumentStore> m_DocumentStore;

        Rendering *m_Rendering;

        spright::Services *m_Services;

        ImageExport *m_ImageExport;

        std::unique_ptr<JsonIO> m_JsonExport;

        std::unique_ptr<EventEmitter> m_EventEmitter;

        RunLoop m_RunLoop;

        FramePlayer m_FramePlayer;
    };

} // namespace editor
} // namespace spright
