#pragma once
#include "../../../engine/graphics/impl/gl/gl_renderer2d.h"
#include "../../../engine/graphics/impl/gl/gl_shader.h"
#include "../../../engine/graphics/layer/group.h"
#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/renderable/bounds.h"
#include "../../../engine/graphics/renderable/line_shape.h"
#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../../engine/graphics/shader/shader.h"
#include "../../../engine/layout/container.h"
#include "../../../engine/system/window/window.h"
#include "../../core/history/document_history.h"
#include "../checkerboard.h"
#include "./../document.h"
#include "./../drawing.h"
#include "./../frame.h"
#include "create_drawing_props.h"
#include "renderer_provider.h"

#include <vector>

namespace spright
{
namespace editor
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
} // namespace editor
} // namespace spright
