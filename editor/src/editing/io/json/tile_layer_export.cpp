#include "tile_layer_export.h"

namespace spright
{
namespace editing
{
    TileLayerExport::TileLayerExport(std::shared_ptr<DocumentFactory> documentFactory)
        : m_DocumentFactory(documentFactory)
    {
    }

    nlohmann::json TileLayerExport::exportLayer(const TileLayer &layer) const
    {
        nlohmann::json json;

        json["bounds"] = layer.getBounds().toArray();
        json["name"] = layer.getName();
        json["index"] = layer.getIndex();
        json["tile_size"] = layer.getTileSize();
        for (int i = 0; i < layer.getIndexSize(); i++)
        {
            if (layer.getAtTileIndex(i) != nullptr)
            {
                unsigned int color = layer.getAtTileIndex(i)->getColor();
                std::string colorHex = int_to_hex(color);
                std::string string(colorHex + ":" + std::to_string(i));
                json["tiles"] += string;
            }
        }

        std::string string = json.dump();
        return json;
    }


    TileLayer TileLayerExport::importLayer(nlohmann::json json) const
    {
        nlohmann::json boundsStr = json["bounds"];
        Bounds bounds = Bounds::createWithPositions(boundsStr[0].get<float>(),
                                                    boundsStr[1].get<float>(),
                                                    boundsStr[2].get<float>(),
                                                    boundsStr[3].get<float>());

        std::string tileSizeStr = json["tile_size"].dump();
        float tilsSize = std::stof(tileSizeStr);

        TileLayer layer = m_DocumentFactory->createUserLayer(bounds, json["name"], tilsSize);

        int tileCount = json["tiles"].size();

        Vec2 halfTileSize = Vec2(layer.getTileSize() / 2.0f, layer.getTileSize() / 2.0f);
        float tileSize = layer.getTileSize();

        for (int i = 0; i < tileCount; i++)
        {
            std::string tile = json["tiles"][i].dump();

            std::string colorStr = tile.substr(1, 10);

            std::string tileIndexStr = tile.substr(12);
            tileIndexStr.pop_back();

            unsigned int index = std::stoi(tileIndexStr);
            unsigned int color = std::stoul(colorStr, nullptr, 16);

            Vec2 bottomLeftPos = layer.getBottomLeftPos(index);
            layer.add(Rect2D(bottomLeftPos.x, bottomLeftPos.y, tileSize, tileSize, color));
        }

        return layer;
    }
} // namespace editing
} // namespace spright
