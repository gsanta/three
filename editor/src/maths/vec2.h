#pragma once

#include <cmath>
#include <iostream>

namespace spright
{
namespace maths
{

    struct Vec2
    {
        float x, y;

        Vec2();

        Vec2(const float &x, const float &y);

        Vec2(const float &xy);

        Vec2 &add(const Vec2 &other);

        Vec2 &subtract(const Vec2 &other);

        Vec2 &multiply(const Vec2 &other);

        Vec2 &divide(const Vec2 &other);

        float length() const;

        friend Vec2 operator+(Vec2 left, const Vec2 &right);

        friend Vec2 operator-(Vec2 left, const Vec2 &right);

        friend Vec2 operator*(Vec2 left, const Vec2 &right);

        friend Vec2 operator*(Vec2 left, const float right);

        friend Vec2 operator/(Vec2 left, const Vec2 &right);

        friend Vec2 operator/(Vec2 left, const float right);

        friend std::ostream &operator<<(std::ostream &stream, const Vec2 &vec);

        Vec2 &operator=(const Vec2 &other);

        bool operator==(const Vec2 &other) const;

        bool operator!=(const Vec2 &other) const;

        Vec2 &operator+=(const Vec2 &other);

        Vec2 &operator-=(const Vec2 &other);

        Vec2 &operator*=(const Vec2 &other);

        Vec2 &operator*=(float val);

        Vec2 &operator/=(const Vec2 &other);

        Vec2 operator-();

        static float distance(const Vec2 &left, const Vec2 &right);
    };
} // namespace maths
} // namespace spright
