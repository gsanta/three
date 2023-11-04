#pragma once

#include "../camera/camera.h"
#include "../renderable/renderable2d.h"
#include "../renderer/renderer2d.h"

#include <algorithm>
#include <nlohmann/json.hpp>
#include <string>

namespace spright
{
namespace engine
{

    template <typename T>
    class Group
    {
    public:
        Group();

        Group(const Group &);

        ~Group();

        bool operator==(const Group<T> &) const;

        Group &operator=(const Group &);

        T &add(const T &renderable);

        void render(const Camera &camera, Renderer2D &renderer);

        void clear();

        void remove(const T &renderable);

        inline std::vector<T *> &getRenderables()
        {
            return m_Renderables;
        }

        inline const std::vector<T *> &getRenderables() const
        {
            return m_Renderables;
        }

    protected:
        std::vector<T *> m_Renderables;
    };

    template <typename T>
    bool Group<T>::operator==(const Group<T> &rhs) const
    {
        const Group<T> &lhs = *this;

        if (lhs.m_Renderables.size() != rhs.m_Renderables.size())
        {
            return false;
        }

        for (int i = 0; i < lhs.m_Renderables.size(); i++)
        {
            if (*lhs.m_Renderables[i] != *rhs.m_Renderables[i])
            {
                return false;
            }
        }

        return true;
    }

    template <typename T>
    bool operator!=(const Group<T> &lhs, const Group<T> &rhs)
    {
        return !(lhs == rhs);
    }

    template <typename T>
    Group<T>::Group()
    {
    }

    template <typename T>
    Group<T>::Group(const Group &group)
    {
        for (T *item : group.m_Renderables)
        {
            m_Renderables.push_back(item->clone());
        }
    }

    template <typename T>
    Group<T>::~Group()
    {
        for (int i = 0; i < m_Renderables.size(); i++)
        {
            delete m_Renderables[i];
        }
    }

    template <typename T>
    Group<T> &Group<T>::operator=(const Group<T> &that)
    {
        if (this != &that)
        {
            for (T *element : m_Renderables)
            {
                delete element;
            }
            m_Renderables.clear();

            for (T *item : that.m_Renderables)
            {
                m_Renderables.push_back(item->clone());
            }
        }

        return *this;
    }

    template <typename T>
    T &Group<T>::add(const T &renderable)
    {
        m_Renderables.push_back(renderable.clone());
        return *m_Renderables.back();
    }

    template <typename T>
    void Group<T>::remove(const T &renderable)
    {
        // TODO: fix operator== for renderable/rect2d so that simple find can be used
        auto it = std::find_if(m_Renderables.begin(), m_Renderables.end(), [&](Renderable2D *other) {
            return other->isEqual(renderable);
        });

        if (it != m_Renderables.end())
        {
            m_Renderables.erase(it);
        }
    }

    template <typename T>
    void Group<T>::clear()
    {
        // TODO: check if the renderables will be destroyed
        for (T *element : m_Renderables)
        {
            delete element;
        }

        m_Renderables.clear();
    }

    template <typename T>
    void Group<T>::render(const Camera &camera, Renderer2D &renderer)
    {
        renderer.begin();

        renderer.getShader().setUniformMat4("pr_matrix", camera.getProjectionMatrix());

        renderer.push(camera.getViewMatrix());
        for (const T *renderable : m_Renderables)
        {
            renderable->submit(renderer);
        }
        renderer.end();
        renderer.pop();

        renderer.flush();
    }

} // namespace engine
} // namespace spright
