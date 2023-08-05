#include "rect2d.h"

namespace spright
{
namespace engine
{
    Rect2D::Rect2D(float x, float y, float width, float height, unsigned int color)
        : m_Position(Vec3(x, y, 0)), m_Size(Vec2(width, height)), Renderable2D(Bounds(x, y, width, height), color)
    {
        m_VertexCount = 4;
        updateBounds();
    }

    Rect2D::Rect2D(const Rect2D &rect2d)
        : m_Position(rect2d.m_Position), m_Size(rect2d.m_Size), Renderable2D(Bounds(), rect2d.m_Color)
    {
        m_VertexCount = 4;

        m_bounds = Bounds(m_Position.x, m_Position.y, m_Size.x, m_Size.y);
        updateBounds();
    }

    bool Rect2D::isEqual(const Renderable2D &rhs) const
    {
        Rect2D rect2d = dynamic_cast<const Rect2D &>(rhs);

        return Renderable2D::isEqual(rect2d) && m_Size == rect2d.m_Size && m_Position == rect2d.m_Position;
    }


    int Rect2D::getTileIndex()
    {
        return m_TileIndex;
    }

    void Rect2D::setTileIndex(int index)
    {
        m_TileIndex = index;
    }

    Vec3 Rect2D::getPosition()
    {
        return m_Position;
    }

    Vec2 Rect2D::getPosition2d()
    {
        return Vec2(m_Position.x, m_Position.y);
    }

    void Rect2D::setSize(Vec2 size)
    {
        this->m_Size = size;
        updateBounds();
    }

    Vec2 Rect2D::getSize()
    {
        return m_Size;
    }

    void Rect2D::setPosition(Vec2 position)
    {
        this->m_Position = Vec3(position.x, position.y, m_Position.z);
        updateBounds();
    }

    void Rect2D::setCenterPosition(Vec2 position)
    {
        this->m_Position = Vec3(position.x - m_Size.x / 2.0f, position.y - m_Size.y / 2.0f, m_Position.z);
        updateBounds();
    }

    Vec2 Rect2D::getCenterPosition2d() const
    {
        return Vec2(m_Position.x + m_Size.x / 2.0f, m_Position.y + m_Size.y / 2.0f);
    }

    bool Rect2D::contains(Vec2 point)
    {
        const Bounds &bounds = getBounds();
        return point.x > bounds.minX && point.x < bounds.maxX && point.y > bounds.minY && point.y < bounds.maxY;
    }

    void Rect2D::translate(Vec2 vec)
    {
        this->m_Position.x += vec.x;
        this->m_Position.y += vec.y;
        updateBounds();
    }

    nlohmann::json Rect2D::getJson()
    {
        nlohmann::json json = {
            {"posX", m_Position.x},
            {"posY", m_Position.y},
            {"posZ", m_Position.z},
            {"sizeX", m_Size.x},
            {"sizeY", m_Size.y},
        };

        return json;
    }

    void Rect2D::submit(Renderer2D *renderer) const
    {
        VertexData *&buffer = renderer->getBuffer();
        const Mat4 *transformation = renderer->getTransformation();
        buffer->vertex = *transformation * m_Position;
        buffer->uv = m_UV[0];
        buffer->tid = 0.0f;
        buffer->color = m_Color;
        buffer++;

        buffer->vertex = *transformation * Vec3(m_Position.x, m_Position.y + m_Size.y, m_Position.z);
        buffer->uv = m_UV[1];
        buffer->tid = 0.0f;
        buffer->color = m_Color;
        buffer++;

        buffer->vertex = *transformation * Vec3(m_Position.x + m_Size.x, m_Position.y + m_Size.y, m_Position.z);
        buffer->uv = m_UV[2];
        buffer->tid = 0.0f;
        buffer->color = m_Color;
        buffer++;

        buffer->vertex = *transformation * Vec3(m_Position.x + m_Size.x, m_Position.y, m_Position.z);
        buffer->uv = m_UV[3];
        buffer->tid = 0.0f;
        buffer->color = m_Color;
        buffer++;

        renderer->setIndexCount(renderer->getIndexCount() + 6);
    }

    void Rect2D::updateBounds()
    {
        float width = m_Size.x;
        float height = m_Size.y;
        m_bounds.minX = m_Position.x;
        m_bounds.maxX = m_Position.x + width;
        m_bounds.minY = m_Position.y;
        m_bounds.maxY = m_Position.y + height;
    }
} // namespace engine
} // namespace spright
