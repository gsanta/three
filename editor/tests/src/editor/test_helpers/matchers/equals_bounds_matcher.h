#include "../src/maths/data/bounds.h"

#include <catch2/catch_approx.hpp>
#include <catch2/matchers/catch_matchers_templated.hpp>

using namespace ::spright::engine;

struct EqualsBoundsMatcher : Catch::Matchers::MatcherGenericBase
{
    inline EqualsBoundsMatcher(const Bounds &bounds) : m_Bounds{bounds}
    {
    }

    inline bool match(const Bounds &other) const
    {
        m_Other = other;
        return m_Bounds.minX == Catch::Approx(other.minX) && m_Bounds.maxX == Catch::Approx(other.maxX) &&
               m_Bounds.minY == Catch::Approx(other.minY) && m_Bounds.maxY == Catch::Approx(other.maxY);
    }

    inline std::string describe() const override
    {
        return "Not equal: \nexpected: " + m_Bounds.toString() + " \ngot: " + m_Other.toString();
    }

private:
    const Bounds &m_Bounds;

    mutable Bounds m_Other;
};

inline auto EqualsBounds(const Bounds &bounds) -> EqualsBoundsMatcher
{
    return EqualsBoundsMatcher{bounds};
}
