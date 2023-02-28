#include "gl_shader.h"

namespace spright { namespace engine {

	GLShader::GLShader(const char* vertPath, const char* fragPath)
		: m_VertPath(vertPath), m_FragPath(fragPath), m_Use(new std::size_t(1))
	{
		m_ShaderID = load();
	}

	GLShader::GLShader(const GLShader& shader): m_VertPath(shader.m_VertPath), m_FragPath(shader.m_FragPath), m_ShaderID(shader.m_ShaderID), m_Use(shader.m_Use)
	{
		++*m_Use;
	}

	GLShader::~GLShader() {
		if (--*m_Use == 0) {
			delete m_VertPath;
			delete m_FragPath;
			glDeleteProgram(m_ShaderID);
		}
	}

	GLShader& GLShader::operator=(const GLShader& rhs)
	{
		++*rhs.m_Use;
		if (--*m_Use == 0) {
			delete m_VertPath;
			delete m_FragPath;
			glDeleteProgram(m_ShaderID);
		}
		m_VertPath = rhs.m_VertPath;
		m_FragPath = rhs.m_FragPath;
		m_Use = rhs.m_Use;

		return *this;
	}

	void GLShader::setUniform1f(const GLchar* name, float value)
	{
		glUniform1f(getUniformLocation(name), value);
	}

	void GLShader::setUniform1fv(const GLchar* name, float* value, int count)
	{
		glUniform1fv(getUniformLocation(name), count, value);
	}

	void GLShader::setUniform1i(const GLchar* name, int value)
	{
		glUniform1i(getUniformLocation(name), value);
	}

	void GLShader::setUniform1iv(const GLchar* name, int* value, int count)
	{
		glUniform1iv(getUniformLocation(name), count, value);
	}

	void GLShader::setUniform2f(const GLchar* name, const Vec2& vector)
	{
		glUniform2f(getUniformLocation(name), vector.x, vector.y);
	}

	void GLShader::setUniform3f(const GLchar* name, const Vec3& vector)
	{
		glUniform3f(getUniformLocation(name), vector.x, vector.y, vector.z);
	}

	void GLShader::setUniform4f(const GLchar* name, const Vec4& vector)
	{
		glUniform4f(getUniformLocation(name), vector.x, vector.y, vector.z, vector.w);
	}

	void GLShader::setUniformMat4(const GLchar* name, const Mat4& matrix)
	{
		glUniformMatrix4fv(getUniformLocation(name), 1, GL_FALSE, matrix.elements);
	}

	GLuint GLShader::load() {
		GLuint program = glCreateProgram();
		GLuint vertex = glCreateShader(GL_VERTEX_SHADER);
		GLuint fragment = glCreateShader(GL_FRAGMENT_SHADER);

		const std::string vertSourceString = FileUtils::read_file(m_VertPath);
		const std::string fragSourceString = FileUtils::read_file(m_FragPath);

		const char* vertSource = vertSourceString.c_str();
		const char* fragSource = fragSourceString.c_str();

		glShaderSource(vertex, 1, &vertSource, NULL);
		glCompileShader(vertex);

		GLint result;
		glGetShaderiv(vertex, GL_COMPILE_STATUS, &result);
		if (result == GL_FALSE) {
			GLint length;
			glGetShaderiv(vertex, GL_INFO_LOG_LENGTH, &length);
			std::vector<char> error(length);
			glGetShaderInfoLog(vertex, length, &length, &error[0]);
			std::cout << "Failed to compile vertex shade" << std::endl << &error[0] << std::endl;
			glDeleteShader(vertex);
			return 0;
		}

		glShaderSource(fragment, 1, &fragSource, NULL);
		glCompileShader(fragment);

		glGetShaderiv(fragment, GL_COMPILE_STATUS, &result);
		if (result == GL_FALSE) {
			GLint length;
			glGetShaderiv(fragment, GL_INFO_LOG_LENGTH, &length);
			std::vector<char> error(length);
			glGetShaderInfoLog(fragment, length, &length, &error[0]);
			std::cout << "Failed to compile fragment shader" << std::endl << &error[0] << std::endl;
			glDeleteShader(fragment);
			return 0;
		}

		glAttachShader(program, vertex);
		glAttachShader(program, fragment);

		glLinkProgram(program);
		glValidateProgram(program);

		glDeleteShader(vertex);
		glDeleteShader(fragment);

		return program;
	}

	GLint GLShader::getUniformLocation(const GLchar* name)
	{
		return glGetUniformLocation(m_ShaderID, name);
	}

	void GLShader::enable() const {
		glUseProgram(m_ShaderID);
	}

	void GLShader::disable() const {
		glUseProgram(0);
	}
}}