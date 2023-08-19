#pragma once
#include "../graphics/renderable/bounds.h"

namespace spright
{
namespace engine
{

    class Container
    {
    public:
        Container(Bounds bounds);

        const Bounds &getBounds() const;

        void setSize(int width, int height);

    private:
        Bounds m_Bounds;
    };
} // namespace engine
} // namespace spright
