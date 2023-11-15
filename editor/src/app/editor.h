#pragma once

#include "../engine/system/window/impl/glfw/gl_window.h"
#include "../engine/system/window/window.h"
#include "./rendering/rendering.h"
#include "./service/io/image_export.h"
#include "./service/io/json/json_io.h"
#include "api/emscripten_event_emitter.h"
#include "core/canvas/canvas_listener_handler.h"
#include "core/run_loop/run_loop.h"
#include "document/document_store.h"
#include "document/factory/document_factory.h"
#include "document/factory/gl_renderer_provider.h"
#include "document/update_screen_bounds.h"
#include "editor_config.h"
#include "event/event_emitter.h"
#include "feature/frame/frame_player.h"
#include "feature/sprite_sheet/sprite_sheet.h"
#include "tool/tool_handler.h"
#include "tool/tools/camera_rotation_tool/camera_rotation_tool.h"
#include "tool/tools/canvas_selection_tool/canvas_selection_tool.h"
#include "tool/tools/circle_tool/circle_tool.h"
#include "tool/tools/color_picker_tool/color_picker_tool.h"
#include "tool/tools/eraser_tool/eraser_tool.h"
#include "tool/tools/line_tool/line_tool.h"
#include "tool/tools/move_tool/move_tool.h"
#include "tool/tools/paint_bucket_tool/paint_bucket_tool.h"
#include "tool/tools/pan_tool/pan_tool.h"
#include "tool/tools/rotate_tool/rotate_tool.h"
#include "tool/tools/select_tool/select_tool.h"
#include "tool/tools/shear_tool/shear_tool.h"
#include "tool/tools/zoom_tool/zoom_tool.h"

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

        SpriteSheet &getSpriteSheet();

        std::shared_ptr<DocumentFactory> getDocumentFactory();

        Document &getActiveDocument();

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

        std::shared_ptr<DocumentFactory> m_DocumentFactory;

        std::shared_ptr<DocumentStore> m_DocumentStore;

        std::unique_ptr<SpriteSheet> m_SpriteSheet;

        Rendering *m_Rendering;

        ImageExport *m_ImageExport;

        std::unique_ptr<JsonIO> m_JsonExport;

        std::unique_ptr<EventEmitter> m_EventEmitter;

        RunLoop m_RunLoop;

        FramePlayer m_FramePlayer;

        UpdateScreenBounds m_UpdateScreenBounds;
    };

} // namespace editor
} // namespace spright
