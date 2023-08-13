#pragma once

namespace spright
{
namespace editor
{

    class Timed
    {

    public:
        virtual void update(int elapsed) = 0;
    };
} // namespace editor
} // namespace spright
