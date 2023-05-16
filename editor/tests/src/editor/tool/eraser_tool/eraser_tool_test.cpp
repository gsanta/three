#include "../../test_helpers/document_info_builder.h"
#include "../../test_helpers/document_store_builder.h"
#include "../../test_helpers/drawing_builder.h"
#include "../../test_helpers/pointer_info_builder.h"
#include "../../test_helpers/test_document_factory.h"
#include "../../test_helpers/tile_layer_builder.h"
#include "../../test_helpers/tool_context_builder.h"
#include "../src/app/document/document_store.h"
#include "../src/app/document/factory/document_factory.h"
#include "../src/app/tool/brush.h"
#include "../src/app/tool/eraser_tool/eraser_tool.h"
#include "../src/app/tool/tool/tool_context.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/graphics/impl/headless/headless_shader.h"
#include "../src/engine/graphics/layer/group.h"
#include "../src/engine/graphics/renderable/rect2d.h"
#include "../src/engine/system/window/impl/headless/headless_window.h"

#include <catch2/catch_test_macros.hpp>

using namespace ::spright::engine;
using namespace ::spright::editor;

TEST_CASE("EraseTool pointerDown", "[erase-tool]")
{
    SECTION("removes the tiles at the given pointer position")
    {
        DocumentStore documentStore = DocumentStoreBuilder()
                                          .withDrawing(DrawingBuilder().withTileLayer(TileLayerBuilder()
                                                                                          .withTile(Vec2Int(0, 0))
                                                                                          .withTile(Vec2Int(1, 0))
                                                                                          .withTile(Vec2Int(2, 0))
                                                                                          .withTile(Vec2Int(0, 1))
                                                                                          .withTile(Vec2Int(1, 1))
                                                                                          .withTile(Vec2Int(2, 1))
                                                                                          .withTile(Vec2Int(0, 2))
                                                                                          .withTile(Vec2Int(1, 2))
                                                                                          .withTile(Vec2Int(2, 2))))
                                          .build();
        TileLayer &activeLayer = documentStore.getActiveDocument().getActiveDrawing().getActiveLayer();

        ToolContext toolContext =
            ToolContextBuilder()
                .withPointerInfo(PointerInfoBuilder().withCurr(activeLayer.getWorldPos(Vec2Int(1, 1))))
                .withDocumentInfo(
                    DocumentInfoBuilder().withActiveDrawing(&documentStore.getActiveDocument().getActiveDrawing()))
                .build();

        Rect2D *renderable = activeLayer.getAtTileIndex(0);

        EraserTool eraseTool(1);

        eraseTool.execPointerDown(toolContext);

        REQUIRE(activeLayer.getAtTilePos(0, 0) != nullptr);
        REQUIRE(activeLayer.getAtTilePos(1, 0) != nullptr);
        REQUIRE(activeLayer.getAtTilePos(2, 0) != nullptr);
        REQUIRE(activeLayer.getAtTilePos(0, 1) != nullptr);
        REQUIRE(activeLayer.getAtTilePos(1, 1) == nullptr);
        REQUIRE(activeLayer.getAtTilePos(2, 1) != nullptr);
        REQUIRE(activeLayer.getAtTilePos(0, 2) != nullptr);
        REQUIRE(activeLayer.getAtTilePos(1, 2) != nullptr);
        REQUIRE(activeLayer.getAtTilePos(2, 2) != nullptr);
    }

    SECTION("removes the tiles at the given pointer position")
    {
        DocumentStore documentStore =
            DocumentStoreBuilder()
                .withDrawing(DrawingBuilder().withBounds(Bounds::createWithPositions(0.0f, 2.0f, 0.0f, 2.0f)))
                .withDrawing(DrawingBuilder().withBounds(Bounds::createWithPositions(0.0f, 5.0f, 0.0f, 5.0f)))
                .build();

        TileLayer &foregroundLayer1 = documentStore.getActiveDocument().getDrawings()[0].getForegroundLayer();
        TileLayer &foregroundLayer2 = documentStore.getActiveDocument().getDrawings()[1].getForegroundLayer();

        ToolContext toolContext = ToolContextBuilder()
                                      .withDocumentInfo(DocumentInfoBuilder().withActiveDrawing(
                                          &documentStore.getActiveDocument().getDrawings()[0]))
                                      .build();

        EraserTool eraseTool(1);

        eraseTool.execPointerMove(toolContext);

        REQUIRE(foregroundLayer1.getRenderables().size() > 0);

        toolContext.doc.setActiveDrawing(&documentStore.getActiveDocument().getDrawings()[1]);
        toolContext.pointer.curr = Vec2(4.0f, 4.0f);

        eraseTool.execPointerMove(toolContext);

        REQUIRE(foregroundLayer1.getRenderables().size() == 0);
    }
}
