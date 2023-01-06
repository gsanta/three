#include "json_export.h"

namespace spright {

	JsonExport::JsonExport(DocumentHandler* documentHandler): m_DocumentHandler(documentHandler) {

	}

	nlohmann::json JsonExport::exportDocument(Document* document) {

		return m_TileLayerExport.exportLayer(dynamic_cast<TileLayer*>(document->getActiveLayer()));
	}


	void JsonExport::importDocument(std::string string)
	{
		nlohmann::json json = nlohmann::json::parse(string);
		int layerCount = json["layers"].size();

		m_DocumentHandler->createDocument();
		for (int i = 0; i < layerCount; i++) {
			nlohmann::json layer = json["layers"][i];
			m_DocumentHandler->createUserLayer(layer["name"], layer["id"]);
		}
	}
}