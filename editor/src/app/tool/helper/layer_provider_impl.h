#pragma once
#include "./layer_provider.h"
#include "../../document/document_store.h"
#include "../../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {
	class LayerProviderImpl : public LayerProvider {
	private:
		DocumentStore* m_DocumentStore;
	public:
		LayerProviderImpl(DocumentStore* documentStore);

		TileLayer& getActiveLayer() override;
		TileLayer& getTempLayer() override;
	};
}}