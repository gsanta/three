#pragma once

namespace spright
{
namespace editing
{

    class Timed
    {

    public:
        virtual void update(int elapsed) = 0;
    };
} // namespace editing
} // namespace spright
