#include "document_store.h"

namespace spright
{
namespace editor
{

    DocumentStore::DocumentStore() : m_ActiveDocument(0)
    {
    }

    Document &DocumentStore::getActiveDocument()
    {
        return m_Documents[m_ActiveDocument];
    }

    void DocumentStore::setDocument(const Document &document)
    {
        m_Documents.clear();
        m_Documents.push_back(document);
    }

    void DocumentStore::setActiveDocument(size_t index)
    {
        m_ActiveDocument = index;
    }

    bool DocumentStore::hasActiveDocument() const
    {
        return m_Documents.size() > m_ActiveDocument;
    }
} // namespace editor
} // namespace spright
