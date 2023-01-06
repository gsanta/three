#include "tile_layer_export.h"

namespace spright {

	TileLayerExport::TileLayerExport(DocumentHandler* documentHandler) : m_DocumentHandler(documentHandler) {

	}

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


	TileLayer* TileLayerExport::importLayer(nlohmann::json json) {
		m_DocumentHandler->createUserLayer(json["name"], json["id"]);
		
		TileLayer* layer = dynamic_cast<TileLayer*>(m_DocumentHandler->getActiveDocument()->getLayer(json["id"]));

		int tileCount = json["tiles"].size();

		for (int i = 0; i < tileCount; i++) {
			layer->add(new Sprite());
		}
	}
}