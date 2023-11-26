#include "cylinder_builder.h"

namespace spright
{
namespace engine
{
    Mesh CylinderBuilder::build() const
    {
        return build(Vec3(0, 0, 0));
    }

    Mesh CylinderBuilder::build(const Vec3 &pos) const
    {
        int tessellation = m_Tessellation;
        float diameterTop = m_DiameterTop;
        float diameterBottom = m_DiameterBottom;
        float height = m_Height;
        int subdivisions = 1;
        float arc = 1.0;

        float angleStep = (M_PI * 2 * arc) / tessellation;

        Vec3 bottomPositions[tessellation];
        Vec3 topPositions[tessellation];

        for (int i = 0; i <= subdivisions; i++)
        {
            float h = i / subdivisions;
            float radius = (h * (diameterTop - diameterBottom) + diameterBottom) / 2;

            for (int j = 0; j < tessellation; j++)
            {
                float angle = j * angleStep;

                float x = std::cos(-angle) * radius;
                float y = -height / 2 + h * height;
                float z = std::sin(-angle) * radius;

                if (i == 0)
                {
                    bottomPositions[j] = Vec3(x, y, z);
                }
                else
                {
                    topPositions[j] = Vec3(x, y, z);
                }
            }
        }

        int vertexCount = tessellation * 6;
        Vec3 positions[vertexCount];

        int counter = 0;
        for (int i = 0; i < tessellation; i++)
        {
            int iPlus1 = i == tessellation - 1 ? 0 : i + 1;

            positions[counter++] = bottomPositions[i];
            positions[counter++] = topPositions[i];
            positions[counter++] = topPositions[iPlus1];
            positions[counter++] = bottomPositions[i];
            positions[counter++] = topPositions[iPlus1];
            positions[counter++] = bottomPositions[iPlus1];
        }

        return Mesh(vertexCount, positions);
    }

    CylinderBuilder &CylinderBuilder::setHeight(float height)
    {
        m_Height = height;
        return *this;
    }

    CylinderBuilder &CylinderBuilder::setDiameterTop(float diameterTop)
    {
        m_DiameterTop = diameterTop;
        return *this;
    }

    CylinderBuilder &CylinderBuilder::setDiameterBottom(float diameterBottom)
    {
        m_DiameterBottom = diameterBottom;
        return *this;
    }

    CylinderBuilder &CylinderBuilder::setTessellation(int tessellation)
    {
        m_Tessellation = tessellation;
        return *this;
    }

    CylinderBuilder &CylinderBuilder::setColor(unsigned int color)
    {
        m_Color = color;

        return *this;
    }
} // namespace engine
} // namespace spright
