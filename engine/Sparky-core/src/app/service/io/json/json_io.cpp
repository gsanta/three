#include "json_io.h"

namespace spright {

	JsonIO::JsonIO() {
		m_TileLayerExport = new TileLayerExport();
	}

	std::string JsonIO::exportDocument(Document* document) {

		nlohmann::json json = {
			{"layers", {}}
		};

		for (Layer* layer : document->getUserLayers()) {
			nlohmann::json jsonLayer = m_TileLayerExport->exportLayer(document, layer->getId());
			json["layers"] += jsonLayer;
		}

		return json.dump();
	}


	void JsonIO::importDocument(DocumentHandler* documentHandler, std::string string)
	{
		nlohmann::json json = nlohmann::json::parse(string);
		int layerCount = json["layers"].size();

		documentHandler->createDocument();
		for (int i = 0; i < layerCount; i++) {
			nlohmann::json layer = json["layers"][i];
		
			TileLayer* tileLayer = m_TileLayerExport->importLayer(documentHandler, layer);
			documentHandler->getActiveDocument()->addUserLayer(tileLayer);
		}
	}
}