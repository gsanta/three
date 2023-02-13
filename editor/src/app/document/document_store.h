#pragma once
#include "document.h"

namespace spright { namespace editor {

	class DocumentStore {
	private:
		Document* m_ActiveDocument = nullptr;
	public:
		DocumentStore();
		~DocumentStore();
		Document* getActiveDocument() const;
		void setActiveDocument(Document* document);
		bool hasActiveDocument() const;
	};
}}