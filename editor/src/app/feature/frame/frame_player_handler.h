#pragma once
#include "../../document/document_store.h"
#include "../../core/run_loop/timed.h"

namespace spright { namespace editor {
	class FramePlayerHandler : public Timed {
	private:
		DocumentStore* m_DocumentStore = nullptr;

	public:
		void update(double elapsed) override;
		void setDocumentStore(DocumentStore* documentStore);
	};
}}
