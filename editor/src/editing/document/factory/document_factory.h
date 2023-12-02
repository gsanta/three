#pragma once
#include "../../../engine/graphics/mesh/builders/box_builder.h"
#include "../../../engine/graphics/mesh/builders/cylinder_builder.h"
#include "../../../engine/graphics/mesh/meshes/box.h"
#include "../../../engine/graphics/mesh/meshes/line3d.h"
#include "../../../engine/graphics/mesh/meshes/rect2d.h"
#include "../../../engine/graphics/renderer/gl/gl_renderer2d.h"
#include "../../../engine/graphics/shader/gl/gl_shader.h"
#include "../../../engine/graphics/shader/shader.h"
#include "../../../engine/scene/cameras/arc_rotate_camera.h"
#include "../../../engine/scene/cameras/camera.h"
#include "../../../engine/scene/cameras/camera2d.h"
#include "../../../engine/scene/canvas/canvas.h"
#include "../../../engine/scene/canvas/canvas2d.h"
#include "../../../engine/scene/canvas/tile_canvas.h"
#include "../../../engine/scene/containers/frame.h"
#include "../../../engine/scene/containers/group.h"
#include "../../../engine/scene/containers/layer.h"
#include "../../../engine/scene/containers/tile_layer.h"
#include "../../../engine/system/utils/uuid_generator.h"
#include "../../../engine/system/window/window.h"
#include "../../../maths/data/bounds.h"
#include "../../history/document_history.h"
#include "../checkerboard.h"
#include "./../document.h"
#include "create_drawing_props.h"
#include "renderer_provider.h"
#include "uuid.h"

#include <vector>

namespace spright
{
namespace editing
{
    using namespace std;
    using namespace ::spright::engine;

    class DocumentFactory
    {
    public:
        DocumentFactory(Window *window, RendererProvider *rendererProvider);

        DocumentFactory(const DocumentFactory &);

        ~DocumentFactory();

        Document createDocument();

        Document createEmptyDocument() const;

        Canvas3d createDrawing3d(const Bounds &bounds) const;

        Drawing createDrawing(const CreateDrawingProps &props) const;

        TileLayer createTileLayer(std::string name, const Bounds &bounds, float tileSize) const;

        TileLayer createBackgroundLayer(const Bounds &bounds, float tileSize) const;

        TileLayer createTempLayer(const Bounds &bounds, float tileSize) const;

        TileLayer createToolLayer(const Bounds &bounds, float tileSize) const;

        TileLayer createCursorLayer(const Bounds &bounds, float tileSize) const;

        void createFrame(Document &document);

        TileLayer createUserLayer(const Bounds &bounds, std::string name, float tileSize = 0.5f) const;

    private:
        Window *m_Window;

        Checkerboard m_Checkerboard;

        RendererProvider *m_RendererProvider = nullptr;

        float m_BackgroundZPos = -0.2f;

        float m_TileLayerZPos = 0;

        float m_CursorLayerZPos = 0.1f;

        float m_ToolLayerZPos = 0.05f;
    };
} // namespace editing
} // namespace spright
