#pragma once

#include "../../shader/shader.h"

namespace spright { namespace engine {

	using namespace ::spright::maths;

	class GLShader : public Shader {
	public:
		GLuint m_ShaderID;
		char* m_VertPath = nullptr;
		char* m_FragPath = nullptr;
	public:
		GLShader(char* vertPath, char* fragPath);
		GLShader(const GLShader& shader);
		~GLShader();

		GLShader& operator=(const GLShader&);

		void setUniform1f(const GLchar* name, float value);
		void setUniform1i(const GLchar* name, int value);
		void setUniform1iv(const GLchar* name, int* value, int count);
		void setUniform1fv(const GLchar* name, float* value, int count);
		void setUniform2f(const GLchar* name, const Vec2& vector);
		void setUniform3f(const GLchar* name, const Vec3& vector);
		void setUniform4f(const GLchar* name, const Vec4& vector);
		void setUniformMat4(const GLchar* name, const Mat4& matrix);

		void enable() const;
		void disable() const;

	private:
		GLuint load();
		GLint getUniformLocation(const GLchar* name);
	};

} }