#include "mat4.h"

namespace spright
{
namespace maths
{

    Mat4::Mat4()
    {
        for (int i = 0; i < 16; i++)
        {
            elements[i] = 0.0f;
        }
    }

    Mat4::Mat4(const float *elements)
    {
        memcpy(this->elements, elements, 4 * 4 * sizeof(float));
    }

    Mat4::Mat4(const Vec4 &col1, const Vec4 &col2, const Vec4 &col3, const Vec4 &col4)
    {
        columns[0].x = col1.x;
        columns[0].y = col1.y;
        columns[0].z = col1.z;
        columns[0].w = col1.w;

        columns[1].x = col2.x;
        columns[1].y = col2.y;
        columns[1].z = col2.z;
        columns[1].w = col2.w;

        columns[2].x = col3.x;
        columns[2].y = col3.y;
        columns[2].z = col3.z;
        columns[2].w = col3.w;

        columns[3].x = col4.x;
        columns[3].y = col4.y;
        columns[3].z = col4.z;
        columns[3].w = col4.w;

        //memcpy(columns, &col1, 4 * sizeof(float));
        //memcpy(columns + 4 * sizeof(float), &col2, 4 * sizeof(float));
        //memcpy(columns + 8 * sizeof(float), &col3, 4 * sizeof(float));
        //memcpy(columns + 12 * sizeof(float), &col4, 4 * sizeof(float));
    }

    Mat4::Mat4(float diagonal)
    {
        for (int i = 0; i < 16; i++)
        {
            elements[i] = 0.0f;
        }

        elements[0 + 0 * 4] = diagonal;
        elements[1 + 1 * 4] = diagonal;
        elements[2 + 2 * 4] = diagonal;
        elements[3 + 3 * 4] = diagonal;
    }

    Mat4 Mat4::identity()
    {
        return Mat4(1.0f);
    }

    Mat4 &Mat4::multiply(const Mat4 &other)
    {
        float data[16];
        for (int y = 0; y < 4; y++)
        {
            for (int x = 0; x < 4; x++)
            {
                float sum = 0.0f;
                for (int e = 0; e < 4; e++)
                {
                    sum += elements[y + e * 4] * other.elements[e + x * 4];
                }
                data[y + x * 4] = sum;
            }
        }

        memcpy(elements, data, 4 * 4 * sizeof(float));

        return *this;
    }

    Vec4 Mat4::multiply(const Vec4 &other) const
    {
        return Vec4(columns[0].x * other.x + columns[1].x * other.y + columns[2].x * other.z + columns[3].x * other.w,
                    columns[0].y * other.x + columns[1].y * other.y + columns[2].y * other.z + columns[3].y * other.w,
                    columns[0].z * other.x + columns[1].z * other.y + columns[2].z * other.z + columns[3].z * other.w,
                    columns[0].w * other.x + columns[1].w * other.y + columns[2].w * other.z + columns[3].w * other.w);
    }

    Vec3 Mat4::multiply(const Vec3 &other) const
    {
        return Vec3(columns[0].x * other.x + columns[1].x * other.y + columns[2].x * other.z + columns[3].x,
                    columns[0].y * other.x + columns[1].y * other.y + columns[2].y * other.z + columns[3].y,
                    columns[0].z * other.x + columns[1].z * other.y + columns[2].z * other.z + columns[3].z);
    }

    void Mat4::setElements(float *newElements)
    {
        memcpy(elements, newElements, 4 * 4 * sizeof(float));
    }

    Mat4 operator*(Mat4 left, const Mat4 &right)
    {
        return left.multiply(right);
    }

    Vec3 operator*(const Mat4 left, const Vec3 &right)
    {
        return left.multiply(right);
    }

    Vec4 operator*(const Mat4 left, const Vec4 &right)
    {
        return left.multiply(right);
    }

    bool operator==(const Mat4 &lhs, const Mat4 &rhs)
    {
        for (int i = 0; i < 16; i++)
        {
            if (lhs.elements[i] != rhs.elements[i])
            {
                return false;
            }
        }

        return true;
    }

    bool operator!=(const Mat4 &lhs, const Mat4 &rhs)
    {
        return !(lhs == rhs);
    }

    std::ostream &operator<<(std::ostream &stream, const Mat4 &mat4)
    {
        for (int i = 0; i < 4; i++)
        {
            for (int j = 0; j < 4; j++)
            {
                stream << mat4.columns[i][j] << ",";
            }
        }

        return stream;
    }

    Mat4 &Mat4::operator*=(const Mat4 &other)
    {
        return multiply(other);
    }

    Mat4 Mat4::otrthographic(float left, float right, float bottom, float top, float near, float far)
    {
        Mat4 result(1.0f);
        result.elements[0 + 0 * 4] = 2.0f / (right - left);
        result.elements[1 + 1 * 4] = 2.0f / (top - bottom);
        result.elements[2 + 2 * 4] = 2.0f / (near - far);
        result.elements[0 + 3 * 4] = (left + right) / (left - right);
        result.elements[1 + 3 * 4] = (bottom + top) / (bottom - top);
        result.elements[2 + 3 * 4] = (far + near) / (far - near);
        return result;
    }

    Mat4 Mat4::perspective(float fov, float m_AspectRatio, float near, float far)
    {
        Mat4 result(1.0f);

        float q = 1.0f / (float)tan(toRadians(0.5f * fov));
        float a = q / m_AspectRatio;

        float b = (near + far) / (near - far);
        float c = (2 * near * far) / (near - far);

        result.elements[0 + 0 * 4] = a;
        result.elements[1 + 1 * 4] = q;
        result.elements[2 + 2 * 4] = a;
        result.elements[3 + 2 * 4] = -1.0f;
        result.elements[2 + 3 * 4] = c;

        return result;
    }

    Mat4 Mat4::translation(const Vec3 &translation)
    {
        Mat4 result(1.0f);
        result.elements[0 + 3 * 4] = translation.x;
        result.elements[1 + 3 * 4] = translation.y;
        result.elements[2 + 3 * 4] = translation.z;

        return result;
    }

    Mat4 Mat4::scale(const Vec3 &scale)
    {
        Mat4 result(1.0f);
        result.elements[0 + 0 * 4] = scale.x;
        result.elements[1 + 1 * 4] = scale.y;
        result.elements[2 + 2 * 4] = scale.z;

        return result;
    }

    Mat4 Mat4::lookAt(const Vec3 &eye, const Vec3 &at, const Vec3 &up)
    {
        Vec3 zaxis = Vec3::subtract(at, eye).normalize();
        Vec3 xaxis = Vec3::cross(zaxis, up).normalize();
        Vec3 yaxis = Vec3::cross(xaxis, zaxis);

        zaxis.negate();

        Mat4 viewMatrix(Vec4(xaxis.x, yaxis.x, zaxis.x, 0),
                        Vec4(xaxis.y, yaxis.y, zaxis.y, 0),
                        Vec4(xaxis.z, yaxis.z, zaxis.z, 0),
                        Vec4(xaxis.dot(eye.negate()), yaxis.dot(eye.negate()), zaxis.dot(eye.negate()), 1));

        return viewMatrix;
    }

    Mat4 Mat4::rotation(float angle, const Vec3 &axis)
    {
        Mat4 result(1.0f);

        float r = toRadians(angle);
        float c = cos(r);
        float s = sin(r);
        float omc = 1.0f - c;

        float x = axis.x;
        float y = axis.y;
        float z = axis.z;

        result.elements[0 + 0 * 4] = x * omc + c;
        result.elements[1 + 0 * 4] = y * x * omc + z * s;
        result.elements[2 + 0 * 4] = z * x * omc - y * s;

        result.elements[0 + 1 * 4] = x * y * omc - z * s;
        result.elements[1 + 1 * 4] = c + y * omc;
        result.elements[2 + 1 * 4] = z * y * omc + x * s;

        result.elements[0 + 2 * 4] = x * z * omc + y * s;
        result.elements[1 + 2 * 4] = y * z * omc - x * s;
        result.elements[2 + 2 * 4] = c + z * omc;

        return result;
    }
} // namespace maths
} // namespace spright
