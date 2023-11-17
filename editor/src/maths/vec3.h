#pragma once

#include "vec2.h"

#include <cmath>
#include <iostream>

namespace spright
{
namespace maths
{
    struct Vec3
    {
        float x, y, z;

        Vec3();

        Vec3(const float &x, const float &y, const float &z);

        Vec3(const Vec2 &vec, float z = 0);

        Vec3 &add(const Vec3 &other);

        Vec3 &subtract(const Vec3 &other);

        Vec3 &multiply(const Vec3 &other);

        Vec3 &divide(const Vec3 &other);

        Vec3 &divide(float magnitude);

        Vec3 &normalize();

        Vec3 negate() const;

        float magnitude();

        float dot(const Vec3 &other);

        Vec3 cross(const Vec3 &other);

        static Vec3 subtract(const Vec3 &left, const Vec3 &right);

        static Vec3 cross(const Vec3 &left, const Vec3 &right);

        friend Vec3 operator+(Vec3 left, const Vec3 &right);

        friend Vec3 operator-(Vec3 left, const Vec3 &right);

        friend Vec3 operator*(Vec3 left, const Vec3 &right);

        friend Vec3 operator/(Vec3 left, const Vec3 &right);

        friend std::ostream &operator<<(std::ostream &stream, const Vec3 vec);

        Vec3 operator*(const float right);

        bool operator==(const Vec3 &other) const;

        bool operator!=(const Vec3 &other) const;

        Vec3 &operator+=(const Vec3 &other);

        Vec3 &operator-=(const Vec3 &other);

        Vec3 &operator*=(const Vec3 &other);

        Vec3 &operator/=(const Vec3 &other);
    };
} // namespace maths
} // namespace spright
