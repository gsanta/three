#include "mesh.h"

namespace spright
{
namespace engine
{
    Mesh::Mesh(const Vec3 &pos, unsigned int color) : m_Color(color)
    {
        m_Position = pos;
    }

    Mesh::Mesh(int vertexCount, unsigned int color)
    {
        m_VertexCount = vertexCount;
        createArrays(vertexCount);
    }

    Mesh::Mesh(int vertexCount, const Vec3 *positions) : Mesh(vertexCount, positions, nullptr)
    {
    }

    Mesh::Mesh(int vertexCount, const Vec3 *positions, const unsigned int *colors)
    {
        m_VertexCount = vertexCount;
        createArrays(vertexCount);

        std::copy_n(positions, vertexCount, m_Positions);
        if (colors != nullptr)
        {
            std::copy_n(colors, vertexCount, m_Colors);
        }

        calcBounds();
    }

    Mesh::Mesh(const Mesh &other)
        : m_Color(other.m_Color), m_Position(other.m_Position), m_VertexCount(other.m_VertexCount)
    {
        createArrays(other.m_VertexCount);
        std::copy_n(other.m_Positions, m_VertexCount, m_Positions);
        std::copy_n(other.m_Normals, m_VertexCount, m_Normals);
        std::copy_n(other.m_Colors, m_VertexCount, m_Colors);
    }

    Mesh &Mesh::operator=(const Mesh &other)
    {
        if (this == &other)
        {
            return *this;
        }

        delete[] m_Positions;
        delete[] m_Normals;
        delete[] m_Colors;

        createArrays(other.m_VertexCount);
        m_Color = other.m_Color;

        std::copy_n(other.m_Positions, m_VertexCount, m_Positions);
        std::copy_n(other.m_Normals, m_VertexCount, m_Normals);
        std::copy_n(other.m_Colors, m_VertexCount, m_Colors);
        return *this;
    }

    Mesh::~Mesh()
    {
        delete[] m_Positions;
        delete[] m_Normals;
        delete[] m_Colors;
    }

    const Vec3 *Mesh::getPositions() const
    {
        return m_Positions;
    }

    const Vec3 &Mesh::getPosition() const
    {
        return m_Position;
    }

    void Mesh::setPosition(const Vec3 &pos)
    {
        m_Position = pos;
    }

    const Bounds &Mesh::getBounds()
    {
        return m_Bounds;
    }

    void Mesh::submit(Renderer2D &renderer) const
    {
        VertexData *&buffer = renderer.getBuffer();
        const Mat4 *transformation = renderer.getTransformation();

        for (int i = 0; i < m_VertexCount; i++)
        {
            buffer->vertex = *transformation * m_Positions[i];
            buffer->tid = 0.0f;
            buffer->color = m_Colors[i];
            buffer++;
        }

        int indexCount = m_VertexCount + m_VertexCount / 2;

        renderer.setIndexCount(renderer.getIndexCount() + m_VertexCount);
    }

    bool Mesh::operator==(const Mesh &rhs)
    {
        return rhs.m_Color == m_Color && rhs.m_Position == m_Position;
    }

    bool Mesh::operator!=(const Mesh &rhs)
    {
        return !(*this == rhs);
    }

    Mesh *Mesh::clone() const
    {
        return new Mesh(*this);
    }

    void Mesh::calcNormals()
    {
        for (int i = 0; i < m_VertexCount; i += 3)
        {
            Vec3 normal = (m_Positions[i] - m_Positions[i + 1]).cross(m_Positions[i] - m_Positions[i + 2]);

            m_Normals[i] = normal;
            m_Normals[i + 1] = normal;
            m_Normals[i + 2] = normal;
        }
    }

    void Mesh::calcBounds()
    {
        Vec3 min = m_Positions[0];
        Vec3 max = m_Positions[0];

        for (int i = 1; i < m_VertexCount; i++)
        {
            for (int xyz = 0; xyz < 3; xyz++)
            {
                if (min[xyz] > m_Positions[i][xyz])
                {
                    min[xyz] = m_Positions[i][xyz];
                }
                else if (min[xyz] < m_Positions[i][xyz])
                {
                    max[xyz] = m_Positions[i][xyz];
                }
            }
        }
    }

    void Mesh::createArrays(int positionsCount)
    {
        m_VertexCount = positionsCount;
        m_Positions = new Vec3[positionsCount];
        m_Normals = new Vec3[positionsCount];
        m_Colors = new int[positionsCount];
    }
} // namespace engine
} // namespace spright
