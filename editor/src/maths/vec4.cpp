#include "vec4.h"

namespace spright
{
namespace maths
{

    Vec4::Vec4()
    {
        x = 0.0f;
        y = 0.0f;
        z = 0.0f;
        w = 0.0f;
    }

    Vec4::Vec4(const float &x, const float &y, const float &z, const float &w)
    {
        this->x = x;
        this->y = y;
        this->z = z;
        this->w = w;
    }

    Vec4 &Vec4::add(const Vec4 &other)
    {
        x += other.x;
        y += other.y;
        z += other.z;
        w += other.w;

        return *this;
    }

    Vec4 &Vec4::subtract(const Vec4 &other)
    {
        x -= other.x;
        y -= other.y;
        z -= other.z;
        w -= other.w;

        return *this;
    }

    Vec4 &Vec4::multiply(const Vec4 &other)
    {
        x *= other.x;
        y *= other.y;
        z *= other.z;
        w *= other.w;

        return *this;
    }

    Vec4 &Vec4::divide(const Vec4 &other)
    {
        x /= other.x;
        y /= other.y;
        z /= other.z;
        w /= other.w;

        return *this;
    }

    Vec4 &Vec4::operator+=(const Vec4 &other)
    {
        return add(other);
    }

    Vec4 &Vec4::operator-=(const Vec4 &other)
    {
        return subtract(other);
    }

    Vec4 &Vec4::operator*=(const Vec4 &other)
    {
        return multiply(other);
    }

    Vec4 &Vec4::operator/=(const Vec4 &other)
    {
        return subtract(other);
    }

    bool Vec4::operator==(const Vec4 &other)
    {
        return x == other.x && y == other.y && z == other.z && w == other.w;
    }

    bool Vec4::operator!=(const Vec4 &other)
    {
        return !(*this == other);
    }

    float Vec4::operator[](int index) const
    {
        switch (index)
        {
        case 0:
            return x;
        case 1:
            return y;
        case 2:
            return z;
        case 3:
            return w;
        default:
            throw std::out_of_range("invalid index");
        }
    }

    Vec4 operator+(Vec4 left, const Vec4 &right)
    {
        return left.add(right);
    }

    Vec4 operator-(Vec4 left, const Vec4 &right)
    {
        return left.subtract(right);
    }

    Vec4 operator*(Vec4 left, const Vec4 &right)
    {
        return left.multiply(right);
    }

    Vec4 operator/(Vec4 left, const Vec4 &right)
    {
        return left.divide(right);
    }

    std::ostream &operator<<(std::ostream &stream, const Vec4 vec)
    {
        stream << "vec4: {" << vec.x << ", " << vec.y << ", " << vec.z << ", " << vec.w << "}";
        return stream;
    }
} // namespace maths
} // namespace spright
