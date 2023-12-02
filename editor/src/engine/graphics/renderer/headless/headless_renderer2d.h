#pragma once

#include "../../buffer/indexBuffer.h"
#include "../../buffer/vertexArray.h"
#include "../../mesh/meshes/renderable2d.h"
#include "../../renderer/renderer2d.h"
#include "../../renderer/vertex_data.h"
#include "../../shader/headless/headless_shader.h"
#include "../../shader/shader.h"

#include <cstddef>
#include <memory>

namespace spright
{
namespace engine
{

    class HeadlessRenderer2D : public Renderer2D
    {
    private:
        VertexData *m_Buffer = nullptr;
        HeadlessShader m_Shader;

    public:
        HeadlessRenderer2D();
        HeadlessRenderer2D(const HeadlessRenderer2D &);

        HeadlessRenderer2D *clone() const override;

        void begin() override;
        void end() override;
        void flush() override;
        VertexData *&getBuffer() override;
        Shader &getShader() override;
    };
} // namespace engine
} // namespace spright
