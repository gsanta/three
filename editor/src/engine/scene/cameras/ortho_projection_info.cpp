#include "ortho_projection_info.h"

namespace spright
{
namespace engine
{
    OrthoProjectionInfo::OrthoProjectionInfo(Bounds bounds, float near, float far)
        : left(bounds.minX), right(bounds.maxX), bottom(bounds.minY), top(bounds.maxY), near(near), far(far)
    {
    }

    OrthoProjectionInfo::OrthoProjectionInfo()
    {
    }

    void OrthoProjectionInfo::setSize(float newWidth, float newHeight)
    {
        float deltaWidth = (newWidth - getWidth()) / 2.0f;

        left -= deltaWidth;
        right += deltaWidth;


        float deltaHeight = (newHeight - getHeight()) / 2.0f;

        top += deltaHeight;
        bottom -= deltaHeight;
    }

    float OrthoProjectionInfo::getWidth() const
    {
        return right - left;
    }

    float OrthoProjectionInfo::getHeight() const
    {
        return top - bottom;
    }
} // namespace engine
} // namespace spright
