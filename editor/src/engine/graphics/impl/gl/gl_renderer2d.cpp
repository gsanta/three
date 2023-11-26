
#include "gl_renderer2d.h"

namespace spright
{
namespace engine
{

    GLRenderer2D::GLRenderer2D(GLShader shader) : m_Shader(shader)
    {
        m_TransformationStack.push_back(Mat4::identity());
        m_TransformationBack = &m_TransformationStack.back();
        init();
    }

    GLRenderer2D::GLRenderer2D(const GLRenderer2D &renderer)
        : m_Shader(renderer.m_Shader), m_TextureSlots(renderer.m_TextureSlots)
    {
        m_TransformationStack = renderer.m_TransformationStack;
        m_TransformationBack = &m_TransformationStack.back();

        init();

        std::copy(renderer.m_BufferBase, renderer.m_BufferBase + RENDERER_MAX_SPRITES * 4, m_BufferBase);
        m_Buffer = m_BufferBase + (renderer.m_Buffer - renderer.m_BufferBase);
    }

    GLRenderer2D::~GLRenderer2D()
    {
        delete m_IBO;
        glDeleteBuffers(1, &m_VBO);
    }

    GLRenderer2D &GLRenderer2D::operator=(Renderer2D &rhs)
    {
        GLRenderer2D &that = dynamic_cast<GLRenderer2D &>(rhs);
        if (&rhs != this)
        {
            delete m_IBO;
            glDeleteBuffers(1, &m_VBO);

            m_Shader = that.m_Shader;
            m_TextureSlots = that.m_TextureSlots;

            init();

            std::copy(that.m_BufferBase, that.m_BufferBase + RENDERER_MAX_SPRITES * 4, m_BufferBase);
            m_Buffer = m_BufferBase + (that.m_Buffer - that.m_BufferBase);
        }

        return *this;
    }

    bool GLRenderer2D::isEqual(const Renderer2D &rhs) const
    {
        throw "isEqual not implemented in GlRenderer2D";
    }

    GLRenderer2D *GLRenderer2D::clone() const
    {
        return new GLRenderer2D(*this);
    }

    void GLRenderer2D::init()
    {
        glGenVertexArrays(1, &m_VAO);
        glGenBuffers(1, &m_VBO);
        glBindVertexArray(m_VAO);
        glBindBuffer(GL_ARRAY_BUFFER, m_VBO);
        glBufferData(GL_ARRAY_BUFFER, RENDERER_BUFFER_SIZE, NULL, GL_DYNAMIC_DRAW);
        //glEnable(GL_CULL_FACE);
        glEnable(GL_BLEND);
        glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
        //glDepthMask(GL_FALSE);

        glEnableVertexAttribArray(SHADER_VERTEX_INDEX);
        glEnableVertexAttribArray(SHADER_UV_INDEX);
        glEnableVertexAttribArray(SHADER_TID_INDEX);
        glEnableVertexAttribArray(SHADER_COLOR_INDEX);

        glVertexAttribPointer(SHADER_VERTEX_INDEX, 3, GL_FLOAT, GL_FALSE, RENDERER_VERTEX_SIZE, (const GLvoid *)0);
        glVertexAttribPointer(SHADER_UV_INDEX,
                              2,
                              GL_FLOAT,
                              GL_FALSE,
                              RENDERER_VERTEX_SIZE,
                              (const GLvoid *)(offsetof(VertexData, uv)));
        glVertexAttribPointer(SHADER_TID_INDEX,
                              1,
                              GL_FLOAT,
                              GL_FALSE,
                              RENDERER_VERTEX_SIZE,
                              (const GLvoid *)(offsetof(VertexData, tid)));
        glVertexAttribPointer(SHADER_COLOR_INDEX,
                              4,
                              GL_UNSIGNED_BYTE,
                              GL_TRUE,
                              RENDERER_VERTEX_SIZE,
                              (const GLvoid *)(offsetof(VertexData, color)));
        glBindBuffer(GL_ARRAY_BUFFER, 0);

        GLuint *indices = new GLuint[RENDERER_INDICES_SIZE];

        int offset = 0;
        for (int i = 0; i < RENDERER_INDICES_SIZE; i += 3)
        {
            indices[i] = offset + 0;
            indices[i + 1] = offset + 2;
            indices[i + 2] = offset + 1;
            // indices[i + 3] = offset + 2;
            // indices[i + 4] = offset + 0;
            // indices[i + 5] = offset + 3;

            offset += 3;
        }

        m_IBO = new IndexBuffer(indices, RENDERER_INDICES_SIZE);

        glBindVertexArray(0);

        m_BufferBase = new VertexData[RENDERER_MAX_SPRITES * 4];
    }

    void GLRenderer2D::begin()
    {
        getShader().enable();
        glBindBuffer(GL_ARRAY_BUFFER, m_VBO);

        m_Buffer = m_BufferBase;
    }

    void GLRenderer2D::end()
    {
        glBufferSubData(GL_ARRAY_BUFFER, 0, (m_Buffer - m_BufferBase) * RENDERER_VERTEX_SIZE, m_BufferBase);
        m_Buffer = m_BufferBase;
        glBindBuffer(GL_ARRAY_BUFFER, 0);
    }

    void GLRenderer2D::flush()
    {
        glBindVertexArray(m_VAO);
        m_IBO->bind();

        glDrawElements(GL_TRIANGLES, m_IndexCount, GL_UNSIGNED_INT, NULL);

        m_IBO->unbind();
        glBindVertexArray(0);

        m_IndexCount = 0;
        getShader().disable();
    }

    Shader &GLRenderer2D::getShader()
    {
        return m_Shader;
    }
} // namespace engine
} // namespace spright
