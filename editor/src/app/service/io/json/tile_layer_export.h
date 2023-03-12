#pragma once
#include <nlohmann/json.hpp>
#include "../../../../engine/graphics/layer/tileLayer.h"
#include "../../../document/document.h"
#include "../../../document/document_handler.h"
#include "../../../document/document_store.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;

	class TileLayerExport {
		DocumentStore* m_DocumentStore;
		DocumentHandler* m_DocumentHandler;
	public:
		TileLayerExport(DocumentStore* documentStore, DocumentHandler* documentHandler);
		nlohmann::json exportLayer(Document* document, std::string layerId);
		void importLayer(nlohmann::json json);
	};
}}