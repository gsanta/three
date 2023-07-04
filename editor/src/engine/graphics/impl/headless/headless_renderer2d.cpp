#include "headless_renderer2d.h"

namespace spright
{
namespace engine
{
    HeadlessRenderer2D::HeadlessRenderer2D()
    {
    }

    HeadlessRenderer2D::HeadlessRenderer2D(const HeadlessRenderer2D &other)
    {
        m_TransformationStack = other.m_TransformationStack;
        m_TransformationBack = &m_TransformationStack.back();
    }

    void HeadlessRenderer2D::begin()
    {
    }

    HeadlessRenderer2D *HeadlessRenderer2D::clone() const
    {
        return new HeadlessRenderer2D(*this);
    }

    void HeadlessRenderer2D::end()
    {
    }

    void HeadlessRenderer2D::flush()
    {
    }

    VertexData *&HeadlessRenderer2D::getBuffer()
    {
        return m_Buffer;
    }

    Shader &HeadlessRenderer2D::getShader()
    {
        return m_Shader;
    }
} // namespace engine
} // namespace spright
