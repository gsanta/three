#include "frame_player_handler.h"

namespace spright { namespace editor {
	void FramePlayerHandler::update(double elapsed) {
		if (m_DocumentStore == nullptr) {
			return;
		}

		for (Drawing& drawing : m_DocumentStore->getActiveDocument().getDrawings()) {
			drawing.getFramePlayer().update(elapsed);
		}
	}
	
	void FramePlayerHandler::setDocumentStore(DocumentStore* documentStore) {
		m_DocumentStore = documentStore;
	}
}}