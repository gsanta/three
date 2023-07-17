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
#include "../checkerboard.h"
#include "./../document.h"
#include "./../drawing.h"
#include "./../frame.h"
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
        DocumentFactory(Container *windowContainer, RendererProvider *rendererProvider);

        DocumentFactory(const DocumentFactory &);

        ~DocumentFactory();

        Document createDocument();

        Drawing createDrawing(Bounds bounds, bool checkerboard = true, float zPos = 0);

        TileLayer createTileLayer(std::string name, const Bounds &bounds, float tileSize);

        TileLayer createBackgroundLayer(const Bounds &bounds, float tileSize);

        void createFrame(Document &document);

        void createUserLayer(Drawing &drawing, std::string name);

    private:
        Container *m_WindowContainer;

        Checkerboard m_Checkerboard;

        RendererProvider *m_RendererProvider = nullptr;

        float m_BackgroundZPos = -0.1f;

        float m_TileLayerZPos = 0;
    };
} // namespace editor
} // namespace spright
