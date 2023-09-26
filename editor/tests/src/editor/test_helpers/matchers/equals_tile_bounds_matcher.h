#include "../src/engine/graphics/renderable/bounds_int.h"

#include <catch2/catch_approx.hpp>
#include <catch2/matchers/catch_matchers_templated.hpp>

using namespace ::spright::engine;

struct EqualsTileBoundsMatcher : Catch::Matchers::MatcherGenericBase
{
    inline EqualsTileBoundsMatcher(const BoundsInt &bounds) : m_Bounds{bounds}
    {
    }

    inline bool match(const BoundsInt &other) const
    {
        m_Other = other;
        return m_Bounds.minX == other.minX && m_Bounds.maxX == other.maxX && m_Bounds.minY == other.minY &&
               m_Bounds.maxY == other.maxY;
    }

    inline std::string describe() const override
    {
        return "Not equal: \nexpected: " + m_Bounds.toString() + " \ngot: " + m_Other.toString();
    }

private:
    const BoundsInt &m_Bounds;

    mutable BoundsInt m_Other;
};

inline auto EqualsTileBounds(const BoundsInt &bounds) -> EqualsTileBoundsMatcher
{
    return EqualsTileBoundsMatcher{bounds};
}
