#include "document_store_builder.h"


DocumentStoreBuilder::DocumentStoreBuilder() : m_Window(500, 500)
{
}

DocumentStoreBuilder &DocumentStoreBuilder::withWindowSize(int windowSize)
{
    m_Window = HeadlessWindow(windowSize, windowSize);

    return *this;
}

DocumentStoreBuilder &DocumentStoreBuilder::withDocumentBounds(Bounds bounds)
{
    m_DocumentBounds = bounds;

    return *this;
}

DocumentStoreBuilder &DocumentStoreBuilder::withDrawing(DrawingBuilder builder)
{
    m_Drawings.push_back(builder);

    return *this;
}

DocumentStoreBuilder &DocumentStoreBuilder::withDrawing()
{
    DrawingBuilder builder;
    m_Drawings.push_back(builder.withTileLayer());

    return *this;
}

DocumentStore DocumentStoreBuilder::build()
{
    Camera2d camera(BoundsInt(0, 0, m_Window.getWidth(), m_Window.getHeight()));

    Canvas2d documentCanvas(UuidGenerator::getInstance().generate(),
                            m_DocumentBounds,
                            *std::make_unique<HeadlessRenderer2D>());
    documentCanvas.setCamera(camera);

    Document document(m_DocumentBounds, documentCanvas, std::make_shared<DocumentHistory>());

    if (m_Drawings.size() == 0)
    {
        m_Drawings.push_back(DrawingBuilder().withBounds(m_DocumentBounds));
    }

    for (DrawingBuilder builder : m_Drawings)
    {
        document.addDrawing(builder.build());
    }

    DocumentStore documentStore;
    documentStore.setDocument(document);

    return documentStore;
}
