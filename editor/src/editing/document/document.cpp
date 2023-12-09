#include "document.h"

namespace spright
{
namespace editing
{
    Document::Document(const Bounds &bounds, const Canvas2d &canvas, std::shared_ptr<DocumentHistory> history)
        : m_Canvas(canvas), m_History(history)
    {
    }

    Document::Document(const Document &other) : m_Canvas(other.m_Canvas)
    {
        m_History = other.m_History;

        for (const auto &canvas : other.m_AllCanvases)
        {
            m_AllCanvases.push_back(std::unique_ptr<Canvas>(canvas->clone()));
        }

        if (other.m_ActiveCanvas)
        {
            int activeCanvasIndex = other.getCanvasIndex(*other.m_ActiveCanvas);
            m_ActiveCanvas = m_AllCanvases[activeCanvasIndex].get();
        }
    }

    Canvas *Document::getActiveCanvas()
    {
        return m_ActiveCanvas;
    }

    Canvas &Document::addCanvas(const Canvas &canvas)
    {
        m_AllCanvases.push_back(std::unique_ptr<Canvas>(canvas.clone()));

        if (!m_ActiveCanvas)
        {
            m_ActiveCanvas = m_AllCanvases.back().get();
        }

        return *m_AllCanvases.back();
    }

    void Document::removeCanvas(const Canvas &canvas)
    {
        auto it = std::find_if(m_AllCanvases.begin(),
                               m_AllCanvases.end(),
                               [&canvas](const std::unique_ptr<Canvas> &element) { return element.get() == &canvas; });

        if (it == m_AllCanvases.end())
        {
            std::invalid_argument("Trying to remove a canvas that is not present in the document.");
        }

        m_AllCanvases.erase(it);
    }

    void Document::setActiveCanvas(const Canvas &canvas)
    {
        auto it = std::find_if(m_AllCanvases.begin(),
                               m_AllCanvases.end(),
                               [&canvas](const std::unique_ptr<Canvas> &element) { return element.get() == &canvas; });

        if (it != m_AllCanvases.end())
        {
            std::invalid_argument("Canvas was not found in the document.");
        }

        m_ActiveCanvas = (*it).get();
    }

    int Document::getCanvasIndex(const Canvas &canvas) const
    {
        std::vector<std::unique_ptr<Canvas>>::const_iterator it =
            std::find_if(m_AllCanvases.begin(), m_AllCanvases.end(), [&canvas](const std::unique_ptr<Canvas> &element) {
                return element.get() == &canvas;
            });

        if (it != m_AllCanvases.end())
        {
            return it - m_AllCanvases.begin();
        }

        return -1;
    }

    Canvas *Document::getCanvas(int index)
    {
        if (index < 0 || m_AllCanvases.size() <= index)
        {
            std::invalid_argument("Canvas not found at index: " + index);
        }

        return m_AllCanvases[index].get();
    }

    std::shared_ptr<DocumentHistory> Document::getHistory()
    {
        return m_History;
    }

    int Document::getCanvasCount() const
    {
        return m_AllCanvases.size();
    }

    void Document::empty()
    {
        m_AllCanvases.clear();
    }

    Canvas &Document::getBackgroundCanvas()
    {
        return m_Canvas;
    }
} // namespace editing
} // namespace spright
