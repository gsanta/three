#include "layer_provider_impl.h"

namespace spright { namespace editor {
	LayerProviderImpl::LayerProviderImpl(DocumentStore* documentStore): m_DocumentStore(documentStore) {}
	
	TileLayer& LayerProviderImpl::getActiveLayer()
	{
		return m_DocumentStore->getActiveDocument()->getActiveLayer();
	}

	TileLayer& LayerProviderImpl::getTempLayer()
	{
		return m_DocumentStore->getActiveDocument()->getActiveFrame().getLayer(DEFAULT_TEMP_LAYER_ID);
	}

}}