#pragma once

#include "../../engine/system/window/impl/glfw/gl_window.h"
#include "../../engine/system/window/window.h"
#include "../../features/frame/frame_player.h"
#include "../../features/sprite_sheet/sprite_sheet.h"
#include "../document/document_store.h"
#include "../document/factory/document_factory.h"
#include "../document/factory/gl_renderer_provider.h"
#include "../document/update_screen_bounds.h"
#include "../event/emscripten_event_emitter.h"
#include "../event/event_emitter.h"
#include "../io/image/image_export.h"
#include "../io/json/json_io.h"
#include "../tool/tool_handler.h"
#include "../tool/tools/camera_rotation_tool/camera_rotation_tool.h"
#include "../tool/tools/canvas_selection_tool/canvas_selection_tool.h"
#include "../tool/tools/circle_tool/circle_tool.h"
#include "../tool/tools/color_picker_tool/color_picker_tool.h"
#include "../tool/tools/eraser_tool/eraser_tool.h"
#include "../tool/tools/line_tool/line_tool.h"
#include "../tool/tools/mesh_creation_tool/mesh_creation_tool.h"
#include "../tool/tools/move_tool/move_tool.h"
#include "../tool/tools/paint_bucket_tool/paint_bucket_tool.h"
#include "../tool/tools/pan_tool/pan_tool.h"
#include "../tool/tools/ray_casting_debug_tool/ray_casting_debug_tool.h"
#include "../tool/tools/rotate_tool/rotate_tool.h"
#include "../tool/tools/select_tool/select_tool.h"
#include "../tool/tools/shear_tool/shear_tool.h"
#include "../tool/tools/zoom_tool/zoom_tool.h"
#include "../utils/run_loop/run_loop.h"
#include "rendering.h"

#include <vector>

namespace spright
{
namespace editing
{
    using namespace features;
    using namespace engine;

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

} // namespace editing
} // namespace spright
