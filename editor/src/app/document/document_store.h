#pragma once
#include <vector>
#include "document.h"

namespace spright { namespace editor {

	class DocumentStore {
	private:
		std::vector<Document> m_Documents;
		size_t m_ActiveDocument;
	public:
		DocumentStore();
		Document& getActiveDocument();
		void addDocument(Document document);
		void setActiveDocument(size_t index);
		bool hasActiveDocument() const;
	};
}}