#include "./ray3.h"

namespace spright
{
namespace maths
{
    Ray3::Ray3(const Vec3 &origin, const Vec3 &direction) : origin(origin), direction(direction)
    {
    }

    Ray3 Ray3::fromTwoPoints(const Vec3 &origin, const Vec3 &pointOnRay)
    {
        Vec3 direction = pointOnRay - origin;

        return Ray3(origin, direction);
    }

} // namespace maths
} // namespace spright
