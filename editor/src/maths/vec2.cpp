#include "vec2.h"

namespace spright { namespace maths {

	Vec2::Vec2() {
		x = 0.0f;
		y = 0.0f;
	}

	Vec2::Vec2(const float& x, const float& y) {
		this->x = x;
		this->y = y;
	}

	Vec2& Vec2::add(const Vec2& other) {
		x += other.x;
		y += other.y;

		return *this;
	}

	Vec2& Vec2::subtract(const Vec2& other) {
		x -= other.x;
		y -= other.y;

		return *this;
	}

	Vec2& Vec2::multiply(const Vec2& other) {
		x *= other.x;
		y *= other.y;

		return *this;
	}

	Vec2& Vec2::divide(const Vec2& other) {
		x /= other.x;
		y /= other.y;

		return *this;
	}

	Vec2& Vec2::operator+=(const Vec2& other) {
		return add(other);
	}

	Vec2& Vec2::operator-=(const Vec2& other) {
		return subtract(other);
	}

	Vec2& Vec2::operator*=(const Vec2& other) {
		return multiply(other);
	}

	Vec2& Vec2::operator/=(const Vec2& other) {
		return divide(other);
	}

	Vec2& Vec2::operator=(const Vec2& other) {
		x = other.x;
		y = other.y;

		return *this;
	}

	bool Vec2::operator==(const Vec2& other) const {
		return x == other.x && y == other.y;
	}

	bool Vec2::operator!=(const Vec2& other) const {
		return !(*this == other);
	}

	float Vec2::distance(Vec2& left, Vec2& right) {
		float x = left.x - right.x;
		float y = left.y - right.y;
		return sqrt(x * x + y * y);
	}

	Vec2 operator+(Vec2 left, const Vec2& right)
	{
		return left.add(right);
	}

	Vec2 operator-(Vec2 left, const Vec2& right)
	{
		return left.subtract(right);
	}

	Vec2 operator*(Vec2 left, const Vec2& right)
	{
		return left.multiply(right);
	}
	
	Vec2 operator*(Vec2 left, const float right)
	{
		left.x *= right;
		left.y *= right;

		return left;
	}

	Vec2 operator/(Vec2 left, const Vec2& right)
	{
		return left.divide(right);
	}
	
	Vec2 operator/(Vec2 left, const float right)
	{
		left.x /= right;
		left.y /= right;

		return left;
	}

	std::ostream& operator<<(std::ostream& stream, const Vec2 vec) {
		stream << "vec2: {" << vec.x << ", " << vec.y << "}";
		return stream;
	}
} }