#include "json_export.h"

namespace spright {

	JsonExport::JsonExport() {

	}

	nlohmann::json JsonExport::exportDocument(Document* document) {

		return m_TileLayerExport.exportLayer(dynamic_cast<TileLayer*>(document->getActiveLayer()));
	}
}