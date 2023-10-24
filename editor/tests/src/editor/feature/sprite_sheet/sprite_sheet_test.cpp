
#include "../../test_helpers/builders/document_builder.h"
#include "../../test_helpers/builders/drawing_builder.h"
#include "../../test_helpers/builders/frame_builder.h"
#include "../../test_helpers/builders/tool_context_builder.h"
#include "../../test_helpers/common_tool_funcs.h"
#include "../../test_helpers/matchers/equals_bounds_matcher.h"
#include "../../test_helpers/test_document_factory.h"
#include "../src/app/feature/sprite_sheet/sprite_sheet.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::editor;

SCENARIO("Sprite sheet")
{

    GIVEN("a drawing with a single frame and layer")
    {
        Document document = DocumentBuilder().withDrawing(DrawingBuilder().withBounds(Bounds(0, 0, 12, 12))).build();
        ToolContext toolContext = ToolContextBuilder().build(document);
        CommonToolFuncs commonToolFuncs(document, toolContext);
        commonToolFuncs.buildRect(BoundsInt(4, 1, 5, 3));

        HeadlessWindow window(4, 4);
        DocumentFactory documentFactory = TestDocumentFactory::createDocumentFactory(window);

        TileLayer &origLayer = document.getActiveDrawing().getActiveLayer();

        SpriteSheet spriteSheet(std::make_shared<DocumentFactory>(documentFactory), &document);

        WHEN("generating a sprite sheet")
        {
            spriteSheet.generateSpriteSheet(document.getActiveDrawing());

            Drawing &spriteSheetDrawing = document.getDrawing(1);
            TileLayer &spriteSheetLayer = spriteSheetDrawing.getFrames()[0].getLayer(0);

            THEN("it creates a new drawing on the right side of the original drawing with half the size")
            {
                REQUIRE(document.getDrawings().size() == 2);

                REQUIRE_THAT(spriteSheetDrawing.getBounds(), EqualsBounds(Bounds(14, 6, 20, 12)));
            }

            THEN("it copies the tiles")
            {
                REQUIRE(spriteSheetLayer.getTiles().size() == origLayer.getTiles().size());

                for (Rect2D *tile : origLayer.getTiles())
                {
                    Vec2Int origTilePos = origLayer.getTilePos(origLayer.getTileIndex(*tile));

                    REQUIRE(spriteSheetLayer.getAtTilePos(origTilePos.x, origTilePos.y) != nullptr);
                }
            }
        }
    }

    GIVEN("a drawing with multiple frames and layers")
    {
        TileLayerBuilder tileLayerBuilder = TileLayerBuilder().withBounds(Bounds(0, 0, 12, 8));
        Document document = DocumentBuilder()
                                .withDrawing(DrawingBuilder().withFrame(
                                    FrameBuilder().withTileLayer(tileLayerBuilder).withTileLayer(tileLayerBuilder),
                                    2))
                                .build();
        ToolContext toolContext = ToolContextBuilder().build(document);
        CommonToolFuncs commonToolFuncs(document, toolContext);

        HeadlessWindow window(4, 4);
        DocumentFactory documentFactory = TestDocumentFactory::createDocumentFactory(window);

        Drawing &drawing = document.getActiveDrawing();

        TileLayer &tile1OnFrame1 = drawing.getFrame(0).getLayer(0);
        TileLayer &tile2OnFrame1 = drawing.getFrame(0).getLayer(1);
        TileLayer &tile1OnFrame2 = drawing.getFrame(1).getLayer(0);
        TileLayer &tile2OnFrame2 = drawing.getFrame(1).getLayer(1);

        commonToolFuncs.createTile(Vec2Int(1, 1), 0, 0);
        commonToolFuncs.createTile(Vec2Int(2, 1), 1, 0);
        commonToolFuncs.createTile(Vec2Int(3, 1), 0, 1);
        commonToolFuncs.createTile(Vec2Int(4, 1), 1, 1);

        SpriteSheet spriteSheet(std::make_shared<DocumentFactory>(documentFactory), &document);

        WHEN("generating a sprite sheet")
        {
            spriteSheet.generateSpriteSheet(document.getActiveDrawing());
            Drawing &spriteSheetDrawing = document.getDrawing(1);

            THEN(
                "it creates a new drawing on the right side of the original drawing and places all frames horizontally")
            {
                REQUIRE_THAT(spriteSheetDrawing.getBounds(), EqualsBounds(Bounds(14, 4, 26, 8)));
                REQUIRE(spriteSheetDrawing.getFrames().size() == 1);
                REQUIRE(spriteSheetDrawing.getFrame(0).getLayers().size() == 2);
            }

            THEN("it copies the tiles")
            {
                REQUIRE(spriteSheetDrawing.getFrame(0).getLayer(0).getTiles().size() == 2);
                REQUIRE(spriteSheetDrawing.getFrame(0).getLayer(1).getTiles().size() == 2);
            }
        }
    }
}
