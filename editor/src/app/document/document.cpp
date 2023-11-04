#include "document.h"

namespace spright
{
namespace editor
{
    Document::Document(const Bounds &bounds,
                       const Canvas &canvas,
                       const Camera &camera,
                       std::shared_ptr<DocumentHistory> history)
        : m_Canvas(canvas), m_Camera(camera), m_History(history)
    {
    }

    Document::Document(const Document &other) : m_Camera(other.m_Camera), m_Canvas(other.m_Canvas)
    {
        m_History = other.m_History;

        m_ActiveCanvasIndex = other.m_ActiveCanvasIndex;

        for (const auto &canvas : other.m_AllCanvases)
        {
            m_AllCanvases.push_back(std::unique_ptr<Canvas>(canvas->clone()));
        }
    }

    Drawing *Document::getActiveDrawing()
    {
        if (m_ActiveCanvasIndex == -1)
        {
            return nullptr;
        }

        return dynamic_cast<Drawing *>(m_AllCanvases[m_ActiveCanvasIndex].get());
    }

    int Document::getActiveCanvasIndex() const
    {
        return m_ActiveCanvasIndex;
    }

    Drawing &Document::addDrawing(const Drawing &drawing)
    {
        m_AllCanvases.push_back(std::unique_ptr<Drawing>(new Drawing(drawing)));

        if (m_ActiveCanvasIndex == -1)
        {
            m_ActiveCanvasIndex = 0;
        }

        return *dynamic_cast<Drawing *>(m_AllCanvases.back().get());
    }

    Drawing &Document::getDrawing(std::string uuid)
    {
        auto it = std::find_if(m_AllCanvases.begin(),
                               m_AllCanvases.end(),
                               [&uuid](const std::unique_ptr<Canvas> &element) { return element->getUuid() == uuid; });

        if (it == m_AllCanvases.end())
        {
            throw std::invalid_argument("Drawing with uuid: " + uuid + " not found.");
        }

        return dynamic_cast<Drawing &>(*(*it));
    }

    void Document::removeCanvas(const std::string &uuid)
    {
        auto it = std::find_if(m_AllCanvases.begin(),
                               m_AllCanvases.end(),
                               [&uuid](const std::unique_ptr<Canvas> &element) { return element->getUuid() == uuid; });

        if (it != m_AllCanvases.end())
        {
            m_AllCanvases.erase(it);
        }
    }

    void Document::addDrawing3d(const Drawing3d &drawing)
    {
        m_AllCanvases.push_back(std::unique_ptr<Drawing3d>(new Drawing3d(drawing)));

        if (m_ActiveCanvasIndex == -1)
        {
            m_ActiveCanvasIndex = 0;
        }
    }

    void Document::setActiveCanvas(const std::string &uuid)
    {
        auto it = std::find_if(m_AllCanvases.begin(),
                               m_AllCanvases.end(),
                               [&uuid](const std::unique_ptr<Canvas> &element) { return element->getUuid() == uuid; });

        if (it != m_AllCanvases.end())
        {
            m_ActiveCanvasIndex = it - m_AllCanvases.begin();
        }
        else
        {
            m_ActiveCanvasIndex = -1;
        }
    }

    std::vector<std::unique_ptr<Canvas>> &Document::getCanvases()
    {
        return m_AllCanvases;
    }

    Canvas &Document::getCanvas(std::string uuid)
    {
        std::vector<std::unique_ptr<Canvas>>::iterator it =
            std::find_if(m_AllCanvases.begin(), m_AllCanvases.end(), [&uuid](const std::unique_ptr<Canvas> &element) {
                return element->getUuid() == uuid;
            });

        if (it == m_AllCanvases.end())
        {
            throw std::invalid_argument("Drawing with uuid: " + uuid + " not found.");
        }
        return *(*it);
    }

    std::shared_ptr<DocumentHistory> Document::getHistory()
    {
        return m_History;
    }

    void Document::empty()
    {
        m_AllCanvases.clear();
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
