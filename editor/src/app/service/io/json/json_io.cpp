#include "json_io.h"

namespace spright { namespace editor {

	JsonIO::JsonIO(DocumentStore* documentStore, DocumentFactory* documentFactory): m_DocumentStore(documentStore), m_DocumentFactory(documentFactory) {
		m_TileLayerExport = new TileLayerExport(documentStore, documentFactory);
	}

	std::string JsonIO::exportDocument(Document* document) {

		nlohmann::json json = {
			{"layers", {}}
		};

		for (TileLayer& layer : document->getActiveFrame().getLayers()) {
			nlohmann::json jsonLayer = m_TileLayerExport->exportLayer(document, layer.getId());
			json["layers"] += jsonLayer;
		}

		return json.dump();
	}


	void JsonIO::importDocument(std::string string)
	{
		nlohmann::json json = nlohmann::json::parse(string);
		int layerCount = json["layers"].size();

		Document* document = m_DocumentFactory->createDocument();
		m_DocumentStore->setActiveDocument(document);
		for (int i = 0; i < layerCount; i++) {
			nlohmann::json layer = json["layers"][i];

			m_TileLayerExport->importLayer(layer);
		}
	}
}}