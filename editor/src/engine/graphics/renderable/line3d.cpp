#include "line3d.h"

namespace spright
{
namespace engine
{
    Line3d::Line3d(const Vec3 &start, const Vec3 &end, float thickness, unsigned int color)
        : Renderable(Vec3(0, 0, 0), color), m_Start(start), m_End(end), m_Thickness(thickness)
    {

        Vec3 vec = m_End - m_Start;
        m_Length = sqrt(vec.x * vec.x + vec.y * vec.y);
        m_Dir = m_End - m_Start;
        m_Dir.normalize();
        m_Normal = Vec2(-m_Dir.y, m_Dir.x);

        Vec3 coord0 = m_Start + m_Normal * m_Thickness;
        Vec3 coord1 = m_Start - m_Normal * m_Thickness;
        Vec3 coord2 = m_End - m_Normal * m_Thickness;
        Vec3 coord3 = m_End + m_Normal * m_Thickness;

        m_Coords[0] = coord0;
        m_Coords[1] = coord1;
        m_Coords[2] = coord2;
        m_Coords[3] = coord3;
    }

    void Line3d::submit(Renderer2D &renderer) const
    {
        VertexData *&buffer = renderer.getBuffer();
        const Mat4 *transformation = renderer.getTransformation();
        buffer->vertex = *transformation * m_Coords[0];
        // buffer->uv = m_UV[0];
        buffer->tid = 0.0f;
        buffer->color = m_Color;
        buffer++;

        buffer->vertex = *transformation * m_Coords[1];
        // buffer->uv = m_UV[1];
        buffer->tid = 0.0f;
        buffer->color = m_Color;
        buffer++;

        buffer->vertex = *transformation * m_Coords[2];
        // buffer->uv = m_UV[2];
        buffer->tid = 0.0f;
        buffer->color = m_Color;
        buffer++;

        buffer->vertex = *transformation * m_Coords[3];
        // buffer->uv = m_UV[3];
        buffer->tid = 0.0f;
        buffer->color = m_Color;
        buffer++;

        renderer.setIndexCount(renderer.getIndexCount() + 6);
    }

    Line3d *Line3d::clone() const
    {
        return new Line3d(*this);
    }
} // namespace engine
} // namespace spright
