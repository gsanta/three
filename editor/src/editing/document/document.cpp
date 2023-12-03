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

        m_ActiveCanvasIndex = other.m_ActiveCanvasIndex;

        for (const auto &canvas : other.m_AllCanvases)
        {
            m_AllCanvases.push_back(std::unique_ptr<Canvas>(canvas->clone()));
        }
    }

    TileCanvas *Document::getActiveDrawing()
    {
        if (m_ActiveCanvasIndex == -1)
        {
            return nullptr;
        }

        return dynamic_cast<TileCanvas *>(m_AllCanvases[m_ActiveCanvasIndex].get());
    }

    Canvas3d *Document::getActiveDrawing3d()
    {
        if (m_ActiveCanvasIndex == -1)
        {
            return nullptr;
        }

        return dynamic_cast<Canvas3d *>(m_AllCanvases[m_ActiveCanvasIndex].get());
    }

    Canvas *Document::getActiveCanvas()
    {
        return m_AllCanvases[m_ActiveCanvasIndex].get();
    }

    int Document::getActiveCanvasIndex() const
    {
        return m_ActiveCanvasIndex;
    }

    TileCanvas &Document::addDrawing(const TileCanvas &drawing)
    {
        m_AllCanvases.push_back(std::unique_ptr<TileCanvas>(new TileCanvas(drawing)));

        if (m_ActiveCanvasIndex == -1)
        {
            m_ActiveCanvasIndex = 0;
        }

        return *dynamic_cast<TileCanvas *>(m_AllCanvases.back().get());
    }

    TileCanvas &Document::getDrawing(std::string uuid)
    {
        auto it = std::find_if(m_AllCanvases.begin(),
                               m_AllCanvases.end(),
                               [&uuid](const std::unique_ptr<Canvas> &element) { return element->getUuid() == uuid; });

        if (it == m_AllCanvases.end())
        {
            throw std::invalid_argument("TileCanvas with uuid: " + uuid + " not found.");
        }

        return dynamic_cast<TileCanvas &>(*(*it));
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

    Canvas3d &Document::addDrawing3d(const Canvas3d &drawing)
    {
        m_AllCanvases.push_back(std::unique_ptr<Canvas3d>(new Canvas3d(drawing)));

        if (m_ActiveCanvasIndex == -1)
        {
            m_ActiveCanvasIndex = 0;
        }

        return *dynamic_cast<Canvas3d *>(m_AllCanvases.back().get());
    }

    // std::vector<Canvas3d> &Document::getDrawing3ds()
    // {
    //     return m_Draw
    // }

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
            throw std::invalid_argument("TileCanvas with uuid: " + uuid + " not found.");
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

    Canvas &Document::getBackgroundCanvas()
    {
        return m_Canvas;
    }
} // namespace editing
} // namespace spright
