#pragma once
#include <nlohmann/json.hpp>
#include "../../../document/document.h"
#include "../../../../engine/graphics/layer/tileLayer.h"
#include "tile_layer_export.h"
#include "../../../document/document_handler.h"
#include "../../../document/document_store.h"

namespace spright { namespace editor {

	class JsonIO {
	private:
		DocumentStore* m_DocumentStore;
		DocumentHandler* m_DocumentHandler;
		TileLayerExport* m_TileLayerExport;
		int m_i;

	public:
		JsonIO(DocumentStore* documentStore, DocumentHandler* documentHandler);
		std::string exportDocument(Document* document);
		void importDocument(std::string string);
	};
}}