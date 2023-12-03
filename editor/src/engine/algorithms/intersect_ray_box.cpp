#include "intersect_ray_box.h"

namespace spright
{
namespace engine
{
    bool intersect_ray_box(const Bounds3 &bounds, const Ray3 &ray, Vec3 &hitPoint)
    {
        const int NUM_DIM = 3;

        bool inside = true;

        Vec3 min = bounds.min();
        Vec3 max = bounds.max();
        Vec3 origin = ray.origin;
        Vec3 direction = ray.direction;

        bool isMiddle[3] = {false, false, false};

        Vec3 planes;

        for (int i = 0; i < NUM_DIM; i++)
        {
            if (origin[i] < min[i])
            {
                planes[i] = min[i];
                inside = false;
            }
            else if (origin[i] > max[i])
            {
                planes[i] = max[i];
                inside = false;
            }
            else
            {
                isMiddle[i] = true;
            }
        }

        if (inside)
        {
            hitPoint = origin;
            return true;
        }

        Vec3 distances;

        for (int i = 0; i < NUM_DIM; i++)
        {
            if (isMiddle[i] == false && direction[i] != 0)
            {
                distances[i] = (planes[i] - origin[i]) / direction[i];
            }
            else
            {
                distances[i] = -1.0;
            }
        }

        int maxDistancePlane = 0;

        for (int i = 1; i < NUM_DIM; i++)
        {
            if (distances[maxDistancePlane] < distances[i])
            {
                maxDistancePlane = i;
            }
        }

        if (distances[maxDistancePlane] < 0)
        {
            return false;
        }

        for (int i = 0; i < NUM_DIM; i++)
        {
            if (maxDistancePlane != i)
            {
                hitPoint[i] = origin[i] + distances[maxDistancePlane] * direction[i];
                if (hitPoint[i] < min[i] || hitPoint[i] > max[i])
                {
                    return false;
                }
            }
            else
            {
                hitPoint[i] = planes[i];
            }
        }

        return true;
    }
} // namespace engine
} // namespace spright
