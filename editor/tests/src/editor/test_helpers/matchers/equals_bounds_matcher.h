#include "../src/engine/graphics/renderable/bounds.h"

#include <catch2/catch_approx.hpp>
#include <catch2/matchers/catch_matchers_templated.hpp>

using namespace ::spright::engine;

struct EqualsBoundsMatcher : Catch::Matchers::MatcherGenericBase
{
    inline EqualsBoundsMatcher(const Bounds &bounds) : bounds{bounds}
    {
    }

    inline bool match(const Bounds &other) const
    {
        return bounds.minX == Catch::Approx(other.minX) && bounds.maxX == Catch::Approx(other.maxX) &&
               bounds.minY == Catch::Approx(other.minY) && bounds.maxY == Catch::Approx(other.maxY);
    }

    inline std::string describe() const override
    {
        return "Equal Bounds";
    }

private:
    const Bounds &bounds;
};

inline auto EqualsBounds(const Bounds &bounds) -> EqualsBoundsMatcher
{
    return EqualsBoundsMatcher{bounds};
}
