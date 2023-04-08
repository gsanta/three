#pragma once
#include <nlohmann/json.hpp>
#include "../../../../engine/graphics/layer/tileLayer.h"
#include "../../../document/document.h"
#include "../../../document/factory/document_factory.h"
#include "../../../document/document_store.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;

	class TileLayerExport {
		DocumentStore* m_DocumentStore;
		DocumentFactory* m_DocumentFactory;
	public:
		TileLayerExport(DocumentStore* documentStore, DocumentFactory* documentHandler);
		nlohmann::json exportLayer(Document& document, size_t layerIndex);
		void importLayer(nlohmann::json json);
	};
}}