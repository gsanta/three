#include "document.h"

namespace spright
{
namespace editor
{

    Document::Document(Bounds bounds, Camera camera, Drawing canvas)
        : Container(bounds), m_Camera(camera), m_Canvas(canvas), m_ActiveDrawing(0)
    {
    }

    Frame &Document::getActiveFrame()
    {
        return m_Drawings[m_ActiveDrawing].getActiveFrame();
    }


    TileLayer &Document::getActiveLayer()
    {
        return m_Drawings[m_ActiveDrawing].getActiveLayer();
    }

    Drawing &Document::getActiveDrawing()
    {
        return m_Drawings[m_ActiveDrawing];
    }

    Drawing &Document::getDrawing(size_t index)
    {
        return m_Drawings[index];
    }

    Drawing *Document::getDrawingAt(const Vec2 &pos)
    {
        for (Drawing &drawing : m_Drawings)
        {
            if (drawing.getBounds().contains(pos.x, pos.y))
            {
                return &drawing;
            }
        }

        return nullptr;
    }

    void Document::addDrawing(const Drawing &drawing)
    {
        m_Drawings.push_back(drawing);
    }

    std::vector<Drawing> &Document::getDrawings()
    {
        return m_Drawings;
    }

    void Document::empty()
    {
        m_Drawings.clear();
    }

    Drawing &Document::getCanvas()
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

    std::string Document::getJson()
    {
        nlohmann::json json = getActiveLayer().getJson();

        return json.dump();
    }
} // namespace editor
} // namespace spright
