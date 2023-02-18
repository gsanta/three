#include "layer_provider_impl.h"

namespace spright { namespace editor {
	LayerProviderImpl::LayerProviderImpl(DocumentStore* documentStore): m_DocumentStore(documentStore) {}
	
	TileLayer& LayerProviderImpl::getActiveLayer()
	{
		return *m_DocumentStore->getActiveDocument()->getLayerHandler()->getActiveLayer();
	}

	TileLayer& LayerProviderImpl::getTempLayer()
	{
		return *m_DocumentStore->getActiveDocument()->getLayerHandler()->getLayer(DEFAULT_TEMP_LAYER_ID);
	}

}}