#include "vec3.h"

namespace spright
{
namespace maths
{

    Vec3::Vec3()
    {
        x = 0.0f;
        y = 0.0f;
        z = 0.0f;
    }

    Vec3::Vec3(const float &x, const float &y, const float &z)
    {
        this->x = x;
        this->y = y;
        this->z = z;
    }

    Vec3::Vec3(const Vec2 &vec, float z) : x(vec.x), y(vec.y), z(z)
    {
    }

    Vec3 &Vec3::add(const Vec3 &other)
    {
        x += other.x;
        y += other.y;
        z += other.z;

        return *this;
    }

    Vec3 &Vec3::subtract(const Vec3 &other)
    {
        x -= other.x;
        y -= other.y;
        z -= other.z;

        return *this;
    }

    Vec3 &Vec3::multiply(const Vec3 &other)
    {
        x *= other.x;
        y *= other.y;
        z *= other.z;

        return *this;
    }

    Vec3 &Vec3::divide(const Vec3 &other)
    {
        x /= other.x;
        y /= other.y;
        z /= other.z;

        return *this;
    }

    Vec3 &Vec3::divide(float magnitude)
    {
        x /= magnitude;
        y /= magnitude;
        z /= magnitude;

        return *this;
    }

    Vec3 &Vec3::normalize()
    {
        float mag = magnitude();
        return divide(mag);
    }

    Vec3 Vec3::negate() const
    {
        return Vec3(-x, -y, -z);
    }

    float Vec3::magnitude()
    {
        return std::sqrt(x * x + y * y + z * z);
    }

    float Vec3::dot(const Vec3 &other)
    {
        return x * other.x + y * other.y + z * other.z;
    }

    Vec3 Vec3::cross(const Vec3 &other)
    {
        return Vec3(y * other.z - z * other.y, z * other.x - x * other.z, x * other.y - y * other.x);
    }

    Vec3 Vec3::subtract(const Vec3 &left, const Vec3 &right)
    {
        return Vec3(left) - right;
    }

    Vec3 Vec3::cross(const Vec3 &left, const Vec3 &right)
    {
        return Vec3(left).cross(right);
    }

    Vec3 &Vec3::operator+=(const Vec3 &other)
    {
        return add(other);
    }

    Vec3 &Vec3::operator-=(const Vec3 &other)
    {
        return subtract(other);
    }

    Vec3 &Vec3::operator*=(const Vec3 &other)
    {
        return multiply(other);
    }

    Vec3 &Vec3::operator/=(const Vec3 &other)
    {
        return subtract(other);
    }

    Vec3 Vec3::operator*(const float right)
    {
        return Vec3(x * right, y * right, z * right);
    }

    bool Vec3::operator==(const Vec3 &other) const
    {
        return x == other.x && y == other.y && z == other.z;
    }

    bool Vec3::operator!=(const Vec3 &other) const
    {
        return !(*this == other);
    }

    Vec3 operator+(Vec3 left, const Vec3 &right)
    {
        return left.add(right);
    }

    Vec3 operator-(Vec3 left, const Vec3 &right)
    {
        return left.subtract(right);
    }

    Vec3 operator*(Vec3 left, const Vec3 &right)
    {
        return left.multiply(right);
    }

    Vec3 operator/(Vec3 left, const Vec3 &right)
    {
        return left.divide(right);
    }

    std::ostream &operator<<(std::ostream &stream, const Vec3 vec)
    {
        stream << "vec3: {" << vec.x << ", " << vec.y << ", " << vec.z << "}";
        return stream;
    }

    float &Vec3::operator[](int index)
    {
        if (index > 3 || index < 0)
        {
            throw std::invalid_argument("Valid indexes for Vec3 are 0, 1 and 2, got: " + index);
        }

        return *(&x + index);
    }
} // namespace maths
} // namespace spright
