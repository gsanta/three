// #include "../src/editing/algorithm/shear.h"
// #include "../test_helpers/builders/tile_layer_builder.h"

// #include <catch2/catch_test_macros.hpp>

// using namespace spright::editing;
// using namespace spright::engine;

// SCENARIO("Vertical shear")
// {
//     GIVEN("a tile layer")
//     {
//         // TileLayer sourceTileLayer = TileLayerBuilder().withBounds(BoundsInt(2, 2, 5, 5)).withTileFill().build();
//         // TileLayer destTileLayer = TileLayerBuilder().withBounds(BoundsInt(2, 2, 5, 5)).build();

//         // WHEN("layer is sheared vertically") {
//         //     shear_vertical(sourceTileLayer, destTileLayer, BoundsInt(0, 1, 3, 3), 0.785398f);

//         //     THEN("the dest layer contains the sheared tiles") {
//         //         REQUIRE(destTileLayer.getTiles().size() == 4);
//         //     }
//         // }
//     }

//     GIVEN("a tile layer")
//     {
//         TileLayer sourceTileLayer = TileLayerBuilder()
//                                         .withBounds(BoundsInt(0, 0, 20, 20))
//                                         .withTile(Vec2Int(4, 4))
//                                         .withTile(Vec2Int(4, 5))
//                                         .withTile(Vec2Int(4, 6))
//                                         .withTile(Vec2Int(4, 7))
//                                         .withTile(Vec2Int(4, 8))
//                                         .withTile(Vec2Int(4, 9))
//                                         .withTile(Vec2Int(4, 10))
//                                         .withTile(Vec2Int(4, 11))

//                                         .withTile(Vec2Int(5, 4))
//                                         .withTile(Vec2Int(5, 5))
//                                         .withTile(Vec2Int(5, 6))
//                                         .withTile(Vec2Int(5, 7))
//                                         .withTile(Vec2Int(5, 8))
//                                         .withTile(Vec2Int(5, 9))
//                                         .withTile(Vec2Int(5, 10))
//                                         .withTile(Vec2Int(5, 11))

//                                         .withTile(Vec2Int(6, 4))
//                                         .withTile(Vec2Int(6, 5))
//                                         .withTile(Vec2Int(6, 6))
//                                         .withTile(Vec2Int(6, 7))
//                                         .withTile(Vec2Int(6, 8))
//                                         .withTile(Vec2Int(6, 9))
//                                         .withTile(Vec2Int(6, 10))
//                                         .withTile(Vec2Int(6, 11))

//                                         .withTile(Vec2Int(7, 4))
//                                         .withTile(Vec2Int(7, 5))
//                                         .withTile(Vec2Int(7, 6))
//                                         .withTile(Vec2Int(7, 7))
//                                         .withTile(Vec2Int(7, 8))
//                                         .withTile(Vec2Int(7, 9))
//                                         .withTile(Vec2Int(7, 10))
//                                         .withTile(Vec2Int(7, 11))

//                                         .build();
//         TileLayer destTileLayer = TileLayerBuilder().withBounds(BoundsInt(0, 0, 20, 20)).build();

//         WHEN("layer is sheared horizontally")
//         {
//             shear_horizontal(sourceTileLayer, destTileLayer, BoundsInt(4, 4, 8, 12), 1.0472f);

//             THEN("the dest layer contains the sheared tiles")
//             {
//                 REQUIRE(destTileLayer.getTiles().size() == 4);
//             }
//         }
//     }
// }
