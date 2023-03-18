#include "tile_layer_export.h"

namespace spright { namespace editor {
	TileLayerExport::TileLayerExport(DocumentStore* documentStore, DocumentFactory* documentFactory): m_DocumentStore(documentStore), m_DocumentFactory(documentFactory)
	{
	}

	nlohmann::json TileLayerExport::exportLayer(Document* document, size_t layerIndex) {
		TileLayer& layer = document->getActiveFrame().getLayer(layerIndex);

		nlohmann::json json;

		json["layerType"] = "tile";
		json["tileW"] = layer.getTileBounds().getWidth();
		json["tileH"] = layer.getTileBounds().getHeight();
		json["name"] = layer.getName();
		json["index"] = layer.getIndex();
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

		TileLayer& layer = m_DocumentFactory->createUserLayer(document, json["name"]);

		int tileCount = json["tiles"].size();

		for (int i = 0; i < tileCount; i++) {
			nlohmann::json tile = json["tiles"][i];

			Vec2 bottomLeftPos = layer.getBottomLeftPos(tile["i"]);
			float tileSize = layer.getTileSize();
			layer.add(Rect2D(bottomLeftPos.x, bottomLeftPos.y, tileSize, tileSize, tile["c"]));
		}
	}
}}