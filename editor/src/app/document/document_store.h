#pragma once
#include "document.h"

#include <vector>

namespace spright
{
namespace editor
{

    class DocumentStore
    {
    public:
        DocumentStore();

        Document &getActiveDocument();

        void addDocument(const Document &document);

        void setDocument(const Document &document);

        void setActiveDocument(size_t index);

        bool hasActiveDocument() const;

    private:
        std::vector<Document> m_Documents;

        size_t m_ActiveDocument;
    };


} // namespace editor
} // namespace spright
