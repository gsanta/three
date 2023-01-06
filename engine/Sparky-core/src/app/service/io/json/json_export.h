#pragma once
#include <nlohmann/json.hpp>
#include "../../../document/document.h"
#include "../../../../engine/graphics/layer/tileLayer.h"
#include "tile_layer_export.h"
#include "../../../document/document_handler.h"

namespace spright {
	using namespace document;

	class JsonExport {
	private:
		TileLayerExport m_TileLayerExport;
		DocumentHandler* m_DocumentHandler;
		int m_i;

	public:
		JsonExport(DocumentHandler* documentHandler);
		nlohmann::json exportDocument(Document* document);
		void importDocument(std::string string);
	};
}