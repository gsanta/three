#include "tile_layer_export.h"

namespace spright {

	nlohmann::json TileLayerExport::exportLayer(TileLayer* layer) {
		nlohmann::json json;

		json["layerType"] = "tile";
		json["tileW"] = layer->getTileBounds().getWidth();
		json["tileH"] = layer->getTileBounds().getHeight();
		for (int i = 0; i < layer->getIndexSize(); i++) {
			if (layer->getAtTileIndex(i) != nullptr) {
				unsigned int color = layer->getAtTileIndex(i)->getColor();
				json["tiles"] += {"i", i, "c", color};
			}
		}

		std::string string = json.dump();
		return json;
	}


	//TileLayer* TileLayerExport::importLayer(std::string str) {
	//	nlohmann::json json = nlohmann::json::parse(str);

	//	new TileLayer()
	//}
}