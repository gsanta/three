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
    Camera2d camera(BoundsInt(0, 0, m_Window.getWidth(), m_Window.getHeight()), -1.0f, 1.0f);

    Canvas documentCanvas(UuidGenerator::getInstance().generate(),
                          m_DocumentBounds,
                          *std::make_unique<HeadlessRenderer2D>());
    documentCanvas.setCamera(camera);

    Document document(m_DocumentBounds, documentCanvas, std::make_shared<DocumentHistory>());

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
