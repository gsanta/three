#pragma once

#include "vec3.h"
#include "vec4.h"
#include "mathFuncs.h"

namespace my_app { namespace maths {
	struct Mat4
	{
		union {
			float elements[16];
			Vec4 columns[4];
		};

		Mat4();
		Mat4(float diagonal);

		static Mat4 identity();

		Mat4& multiply(const Mat4& other);
		Vec3 multiply(const Vec3& other) const;
		Vec4 multiply(const Vec4& other) const;

		static Mat4 otrthographic(float left, float right, float bottom, float top, float near, float far);
		static Mat4 perspective(float fov, float aspectRatio, float near, float far);
		
		static Mat4 translation(const Vec3& translation);
		static Mat4 rotation(float angle, const Vec3& axis);
		static Mat4 scale(const Vec3& scale);

		friend Mat4 operator*(Mat4 left, const Mat4& right);
		friend Vec3 operator*(const Mat4 left, const Vec3& right);
		friend Vec4 operator*(const Mat4 left, const Vec4& right);
		Mat4& operator*=(const Mat4& other);
	};
} }


