#pragma once

#include <vector>
#include <iostream>
#include <GL/glew.h>
#include "../../system/utils/fileUtils.h"
#include "../../../maths/vec2.h"
#include "../../../maths/vec3.h"
#include "../../../maths/mat4.h"

namespace engine { namespace graphics {
	using namespace spright::maths;

	class Shader {
	public:
		virtual void setUniform1f(const GLchar* name, float value) = 0;
		virtual void setUniform1i(const GLchar* name, int value) = 0;
		virtual void setUniform1iv(const GLchar* name, int* value, int count) = 0;
		virtual void setUniform1fv(const GLchar* name, float* value, int count) = 0;
		virtual void setUniform2f(const GLchar* name, const Vec2& vector) = 0;
		virtual void setUniform3f(const GLchar* name, const Vec3& vector) = 0;
		virtual void setUniform4f(const GLchar* name, const engine::maths::Vec4& vector) = 0;
		virtual void setUniformMat4(const GLchar* name, const Mat4& matrix) = 0;

		virtual void enable() const = 0;
		virtual void disable() const = 0;
	};
} }