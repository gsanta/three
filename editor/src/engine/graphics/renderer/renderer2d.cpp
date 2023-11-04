#include "./renderer2d.h"

namespace spright
{
namespace engine
{
    Renderer2D::Renderer2D()
    {
    }

    Renderer2D::Renderer2D(const Renderer2D &that)
        : m_TransformationStack(that.m_TransformationStack), m_IndexCount(that.m_IndexCount)
    {
        m_TransformationBack = nullptr;
        if (m_TransformationStack.size() > 0)
        {
            m_TransformationBack = &m_TransformationStack.back();
        }
    }

    Renderer2D::~Renderer2D()
    {
    }

    Renderer2D &Renderer2D::operator=(Renderer2D &that)
    {
        m_IndexCount = that.m_IndexCount;
        m_TransformationBack = nullptr;
        m_TransformationStack = that.m_TransformationStack;
        if (m_TransformationStack.size() > 0)
        {
            m_TransformationBack = &m_TransformationStack.back();
        }

        return *this;
    }


    bool operator==(const Renderer2D &lhs, const Renderer2D &rhs)
    {
        return lhs.isEqual(rhs);
    }

    bool operator!=(const Renderer2D &lhs, const Renderer2D &rhs)
    {
        return !(lhs == rhs);
    }

    bool Renderer2D::isEqual(const Renderer2D &rhs) const
    {

        for (int i = 0; i < m_TransformationStack.size(); i++)
        {
            if (m_TransformationStack[i] != rhs.m_TransformationStack[i])
            {
                return false;
            }
        }

        return (m_TransformationBack == nullptr && rhs.m_TransformationBack == nullptr) ||
               (*m_TransformationBack == *rhs.m_TransformationBack);
    }

    void Renderer2D::push(const Mat4 &matrix, bool override)
    {
        if (override)
        {
            m_TransformationStack.push_back(matrix);
        }
        else
        {
            Mat4 m = matrix;
            if (m_TransformationStack.size() > 0)
            {
                m = m_TransformationStack.back() * m;
            }
            m_TransformationStack.push_back(m);
        }
        m_TransformationBack = &m_TransformationStack.back();
    }

    void Renderer2D::pop()
    {
        if (m_TransformationStack.size() > 1)
        {
            m_TransformationStack.pop_back();
        }

        m_TransformationBack = &m_TransformationStack.back();
    }

    const spright::maths::Mat4 *Renderer2D::getTransformation()
    {
        return m_TransformationBack;
    }
} // namespace engine
} // namespace spright
