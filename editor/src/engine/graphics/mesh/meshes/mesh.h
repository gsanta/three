#pragma once

#include "../../../../maths/vec3.h"
#include "../../colors.h"
#include "../../renderable/bounds.h"
#include "../../renderer/renderer2d.h"

#include <algorithm>

namespace spright
{
namespace engine
{
    using namespace maths;

    class Mesh
    {
    public:
        Mesh(const Vec3 &pos, unsigned int color);

        Mesh(int vertexCount, unsigned int color);

        Mesh(int vertexCount, const Vec3 *positions);

        Mesh(int vertexCount, const Vec3 *positions, const unsigned int *colors);

        Mesh(const Mesh &other);

        virtual Mesh &operator=(const Mesh &other);

        virtual ~Mesh();

        const Vec3 *getPositions() const;

        const Vec3 &getPosition() const;

        virtual void setPosition(const Vec3 &pos);

        const Bounds &getBounds();

        virtual void submit(Renderer2D &renderer) const;

        virtual inline bool isEqual(const Mesh &obj) const
        {
            return false;
        }

        virtual bool operator==(const Mesh &rhs);

        virtual bool operator!=(const Mesh &rhs);

        virtual Mesh *clone() const;

    private:
        void calcNormals();

        void calcBounds();

        void createArrays(int positionCount);

    protected:
        Vec3 m_Position;

        Vec3 *m_Positions = nullptr;

        Vec3 *m_Normals = nullptr;

        int *m_Colors = nullptr;

        int m_VertexCount = 0;

        unsigned int m_Color;

        Bounds m_Bounds;
    };
} // namespace engine
} // namespace spright
