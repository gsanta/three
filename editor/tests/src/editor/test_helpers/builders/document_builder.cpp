#include "document_builder.h"

DocumentBuilder::DocumentBuilder() : m_Window(500, 500)
{
}

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
    Camera camera(&m_Window, -1.0f, 1.0f);

    std::shared_ptr<Renderer2D> renderer = std::make_shared<HeadlessRenderer2D>();

    Document document(m_DocumentBounds,
                      Canvas(UuidGenerator::getInstance().generate(), m_DocumentBounds, renderer),
                      camera,
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
