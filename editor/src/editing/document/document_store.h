#pragma once
#include "document.h"

#include <vector>

namespace spright
{
namespace editing
{

    class DocumentStore
    {
    public:
        DocumentStore();

        Document &getActiveDocument();

        void setDocument(const Document &document);

        void setActiveDocument(size_t index);

        bool hasActiveDocument() const;

    private:
        std::vector<Document> m_Documents;

        size_t m_ActiveDocument;
    };


} // namespace editing
} // namespace spright
