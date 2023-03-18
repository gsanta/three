#pragma once

#include <iostream>
#include <cmath>

namespace spright { namespace maths {

	struct Vec2 {
		float x, y;

		Vec2();
		Vec2(const float& x, const float& y);

		Vec2& add(const Vec2& other);
		Vec2& subtract(const Vec2& other);
		Vec2& multiply(const Vec2& other);
		Vec2& divide(const Vec2& other);

		friend Vec2 operator+(Vec2 left, const Vec2& right);
		friend Vec2 operator-(Vec2 left, const Vec2& right);
		friend Vec2 operator*(Vec2 left, const Vec2& right);
		friend Vec2 operator*(Vec2 left, const float right);
		friend Vec2 operator/(Vec2 left, const Vec2& right);
		friend Vec2 operator/(Vec2 left, const float right);
		friend std::ostream& operator<<(std::ostream& stream, const Vec2 vec);

		bool operator==(const Vec2& other) const;
		bool operator!=(const Vec2& other) const;
		Vec2& operator+=(const Vec2& other);
		Vec2& operator-=(const Vec2& other);
		Vec2& operator*=(const Vec2& other);
		Vec2& operator/=(const Vec2& other);

		static float distance(Vec2& left, Vec2& right);
	};
}}
