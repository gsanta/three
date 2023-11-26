#include "../src/maths/vec3.h"

#include <catch2/catch_approx.hpp>
#include <catch2/matchers/catch_matchers_templated.hpp>
#include <iostream>
#include <sstream>

using namespace ::spright::maths;

struct EqualsVec3ApproxMatcher : Catch::Matchers::MatcherGenericBase
{
    inline EqualsVec3ApproxMatcher(const Vec3 &vec) : m_Vec{vec}
    {
    }

    inline bool match(const Vec3 &other) const
    {
        m_Other = other;
        return m_Vec.x > other.x - m_Eps && m_Vec.x < other.x + m_Eps && m_Vec.y > other.y - m_Eps &&
               m_Vec.y < other.y + m_Eps && m_Vec.z > other.z - m_Eps && m_Vec.z < other.z + m_Eps;
    }

    inline std::string describe() const override
    {
        std::ostringstream oss;

        oss << "Not equal: \nexpected: ";
        oss << m_Vec;
        oss << " \ngot: ";
        oss << m_Other;

        return oss.str();
    }

private:
    const Vec3 m_Vec;

    mutable Vec3 m_Other;

    float m_Eps = 0.01;
};

inline auto EqualsVec3Approx(const Vec3 &vec) -> EqualsVec3ApproxMatcher
{
    return EqualsVec3ApproxMatcher{vec};
}
