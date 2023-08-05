#include "document_builder.h"

DocumentBuilder &DocumentBuilder::withEmptyDocument()
{
    m_IsEmptyDocument = true;
    return *this;
}

DocumentBuilder &DocumentBuilder::withDrawing(const DrawingBuilder &drawing)
{
    m_Drawings.push_back(drawing);

    return *this;
}

Document DocumentBuilder::build()
{
    Camera camera(m_WindowSize, m_WindowSize, m_DocumentBounds, -1.0f, 1.0f);

    Document document(m_DocumentBounds,
                      camera,
                      DrawingBuilder().withBounds(m_DocumentBounds).build(),
                      std::make_shared<DocumentHistory>());

    if (m_Drawings.size() > 0)
    {
        for (DrawingBuilder builder : m_Drawings)
        {
            document.addDrawing(builder.build());
        }
    }
    else if (!m_IsEmptyDocument)
    {
        document.addDrawing(DrawingBuilder().build());
    }

    return document;
}
