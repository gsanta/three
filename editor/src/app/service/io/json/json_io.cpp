#include "json_io.h"

namespace spright { namespace editor {

	JsonIO::JsonIO(DocumentStore* documentStore, DocumentHandler* documentHandler): m_DocumentStore(documentStore), m_DocumentHandler(documentHandler) {
		m_TileLayerExport = new TileLayerExport(documentStore, documentHandler);
	}

	std::string JsonIO::exportDocument(Document* document) {

		nlohmann::json json = {
			{"layers", {}}
		};

		for (TileLayer* layer : document->getLayerHandler()->getLayers()) {
			nlohmann::json jsonLayer = m_TileLayerExport->exportLayer(document, layer->getId());
			json["layers"] += jsonLayer;
		}

		return json.dump();
	}


	void JsonIO::importDocument(std::string string)
	{
		nlohmann::json json = nlohmann::json::parse(string);
		int layerCount = json["layers"].size();

		Document* document = m_DocumentHandler->createDocument();
		m_DocumentStore->setActiveDocument(document);
		for (int i = 0; i < layerCount; i++) {
			nlohmann::json layer = json["layers"][i];

			TileLayer* tileLayer = m_TileLayerExport->importLayer(layer);
		}
	}
}}