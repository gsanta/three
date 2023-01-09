#include "tile_layer_export.h"

namespace spright {

	nlohmann::json TileLayerExport::exportLayer(Document* document, std::string layerId) {
		TileLayer* layer = dynamic_cast<TileLayer*>(document->getLayer(layerId));

		nlohmann::json json;

		json["layerType"] = "tile";
		json["tileW"] = layer->getTileBounds().getWidth();
		json["tileH"] = layer->getTileBounds().getHeight();
		json["name"] = layer->getId();
		json["id"] = layer->getId();
		for (int i = 0; i < layer->getIndexSize(); i++) {
			if (layer->getAtTileIndex(i) != nullptr) {
				unsigned int color = layer->getAtTileIndex(i)->getColor();
				json["tiles"] += { {"i", i }, { "c", color }};
			}
		}

		std::string string = json.dump();
		return json;
	}


	TileLayer* TileLayerExport::importLayer(DocumentHandler* documentHandler,  nlohmann::json json) {
		std::string string = json.dump();
		documentHandler->createUserLayer(json["name"], json["id"]);
		
		TileLayer* layer = dynamic_cast<TileLayer*>(documentHandler->getActiveDocument()->getLayer(json["id"]));

		int tileCount = json["tiles"].size();

		for (int i = 0; i < tileCount; i++) {
			nlohmann::json tile = json["tiles"][i];

			Vec2 bottomLeftPos = layer->getBottomLeftPos(tile["i"]);
			float tileSize = layer->getTileSize();
			layer->add(new Sprite(bottomLeftPos.x, bottomLeftPos.y, tileSize, tileSize, tile["c"]));
		}

		return layer;
	}
}