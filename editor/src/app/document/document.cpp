#include "document.h"

namespace spright
{
namespace editor
{
    Document::Document(const Bounds &bounds,
                       const Canvas &canvas,
                       const Camera &camera,
                       std::shared_ptr<DocumentHistory> history)
        : m_Canvas(canvas), m_Camera(camera), m_History(history), m_ActiveDrawingIndex(0)
    {
    }

    Document::Document(const Document &other) : m_Camera(other.m_Camera), m_Canvas(other.m_Canvas)
    {
        m_Drawings = other.m_Drawings;
        m_ActiveDrawingIndex = other.m_ActiveDrawingIndex;
        m_History = other.m_History;
    }

    Drawing *Document::getActiveDrawing()
    {
        return m_ActiveDrawingIndex == -1 ? nullptr : &m_Drawings[m_ActiveDrawingIndex];
    }

    void Document::setActiveDrawing(int index)
    {
        if (index < -1 || index >= (int)m_Drawings.size())
        {
            throw std::invalid_argument("Index out of range");
        }

        m_ActiveDrawingIndex = index;
    }

    size_t Document::getActiveDrawingIndex() const
    {
        return m_ActiveDrawingIndex;
    }

    Drawing &Document::getDrawing(size_t index)
    {
        return m_Drawings[index];
    }

    void Document::addDrawing(const Drawing &drawing)
    {
        m_Drawings.push_back(drawing);
    }

    Drawing &Document::getDrawing(int id)
    {
        return m_Drawings[id];
    }

    void Document::removeActiveDrawing()
    {
        m_Drawings.erase(m_Drawings.begin() + m_ActiveDrawingIndex);
    }

    std::vector<Drawing> &Document::getDrawings()
    {
        return m_Drawings;
    }

    std::shared_ptr<DocumentHistory> Document::getHistory()
    {
        return m_History;
    }

    void Document::empty()
    {
        m_Drawings.clear();
    }

    Canvas &Document::getCanvas()
    {
        return m_Canvas;
    }

    Camera &Document::getCamera()
    {
        return m_Camera;
    }

    void Document::setCamera(const Camera &camera)
    {
        m_Camera = camera;
    }
} // namespace editor
} // namespace spright
