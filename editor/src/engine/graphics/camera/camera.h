#pragma once

#include "../../../maths/mat4.h"
#include "../../../maths/mathFuncs.h"
#include "../../../maths/vec2.h"
#include "../../../maths/vec2_int.h"
#include "../../../maths/vec3.h"
#include "../renderable/bounds.h"
#include "./ortho_projection_info.h"

namespace spright
{
namespace engine
{
    using namespace ::spright::maths;

    class Camera
    {
    public:
        Camera(float windowWidth, float windowHeight, Bounds canvasDimensions, float near, float far);

        void translate2D(Vec2 pos);

        void zoom(float newWidth);

        float getZoom();

        const Bounds &getBounds() const;

        const Mat4 getProjectionMatrix() const;

        const Mat4 &getViewMatrix() const;

        Vec2 getCenter2D();

        Vec2 screenToWorldPos(float x, float y) const;

        Vec2Int worldToScreenPos(float x, float y) const;

        void updateWindowSize(float windowWidth, float windowHeight);

    private:
        void updateAspectRatio();

        float getAspectRatio() const;

        Bounds getCameraDimensions();

    private:
        Mat4 m_ProjectionMatrix;

        Mat4 m_View;

        Vec2 m_Translate;

        Bounds m_CameraDim;

        float m_Near;

        float m_Far;

        float z = 0.5f;

        float m_Zoom = 1.0f;

        float m_AspectRatio;

        float m_InitialWidth;

        float m_WindowWidth;

        float m_WindowHeight;

        Bounds m_DocumentBounds;
    };
} // namespace engine
} // namespace spright
