#pragma once

namespace spright
{
namespace editor
{
    static const float MinDiffFromHalfPi = 0.04f;

    inline float get_sign(float number)
    {
        return number < 0 ? -1 : 1;
    }

    inline float get_abs(float number)
    {
        return number < 0 ? -1 * number : number;
    }

    inline float normalize_angle_for_shear(float radang, float mindif)
    {
        float pi2;

        /* Bring angle into range [-pi/2, pi/2] */
        pi2 = 3.14159265 / 2.0;
        if (radang < -pi2 || radang > pi2)
            radang = radang - (float)(radang / pi2) * pi2;

        /* If angle is too close to pi/2 or -pi/2, move it */
        if (radang > pi2 - mindif)
        {
            radang = pi2 - mindif;
        }
        else if (radang < -pi2 + mindif)
        {
            radang = -pi2 + mindif;
        }

        return radang;
    }
} // namespace editor
} // namespace spright
