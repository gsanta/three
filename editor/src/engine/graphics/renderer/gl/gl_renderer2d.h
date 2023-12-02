#pragma once

#include "../../buffer/indexBuffer.h"
#include "../../buffer/vertexArray.h"
#include "../../mesh/meshes/renderable2d.h"
#include "../../renderer/renderer2d.h"
#include "../../renderer/vertex_data.h"
#include "../../shader/gl/gl_shader.h"
#include "../../shader/shader.h"

#include <algorithm>
#include <cstddef>
#include <memory>

namespace spright
{
namespace engine
{

#define RENDERER_MAX_SPRITES 60000
#define RENDERER_VERTEX_SIZE sizeof(VertexData)
#define RENDERER_SPRITE_SIZE RENDERER_VERTEX_SIZE * 4
#define RENDERER_BUFFER_SIZE RENDERER_SPRITE_SIZE *RENDERER_MAX_SPRITES
#define RENDERER_INDICES_SIZE RENDERER_MAX_SPRITES * 6

#define SHADER_VERTEX_INDEX 0
#define SHADER_UV_INDEX 1
#define SHADER_TID_INDEX 2
#define SHADER_COLOR_INDEX 3

    class GLRenderer2D : public Renderer2D
    {
    public:
        GLRenderer2D(GLShader shader);

        GLRenderer2D(const GLRenderer2D &);

        ~GLRenderer2D();

        GLRenderer2D &operator=(Renderer2D &) override;

        bool isEqual(const Renderer2D &rhs) const override;

        GLRenderer2D *clone() const override;

        inline VertexData *&getBuffer() override
        {
            return m_Buffer;
        }

        void begin() override;

        void end() override;

        void flush() override;

        Shader &getShader() override;

    private:
        void init();

    private:
        GLShader m_Shader;

        GLuint m_VBO;

        GLuint m_VAO;

        IndexBuffer *m_IBO;

        VertexData *m_BufferBase;

        VertexData *m_Buffer;

        std::vector<GLuint> m_TextureSlots;
    };
} // namespace engine
} // namespace spright
