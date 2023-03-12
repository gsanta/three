#include "tile_layer_export.h"

namespace spright { namespace editor {
	TileLayerExport::TileLayerExport(DocumentStore* documentStore, DocumentHandler* documentHandler): m_DocumentStore(documentStore), m_DocumentHandler(documentHandler)
	{
	}

	nlohmann::json TileLayerExport::exportLayer(Document* document, std::string layerId) {
		TileLayer& layer = document->getActiveFrame().getLayer(layerId);

		nlohmann::json json;

		json["layerType"] = "tile";
		json["tileW"] = layer.getTileBounds().getWidth();
		json["tileH"] = layer.getTileBounds().getHeight();
		json["name"] = layer.getId();
		json["id"] = layer.getId();
		for (int i = 0; i < layer.getIndexSize(); i++) {
			if (layer.getAtTileIndex(i) != nullptr) {
				unsigned int color = layer.getAtTileIndex(i)->getColor();
				json["tiles"] += { {"i", i }, { "c", color }};
			}
		}

		std::string string = json.dump();
		return json;
	}


	void TileLayerExport::importLayer(nlohmann::json json) {
		std::string string = json.dump();

		Document* document = m_DocumentStore->getActiveDocument();

		TileLayer& layer = m_DocumentHandler->createUserLayer(document, json["name"], json["id"]);

		int tileCount = json["tiles"].size();

		for (int i = 0; i < tileCount; i++) {
			nlohmann::json tile = json["tiles"][i];

			Vec2 bottomLeftPos = layer.getBottomLeftPos(tile["i"]);
			float tileSize = layer.getTileSize();
			layer.add(Rect2D(bottomLeftPos.x, bottomLeftPos.y, tileSize, tileSize, tile["c"]));
		}
	}
}}