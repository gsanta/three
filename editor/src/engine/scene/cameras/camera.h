#pragma once

#include "../../../maths/data/bounds.h"
#include "../../../maths/data/bounds_int.h"
#include "../../../maths/mat4.h"
#include "../../../maths/mathFuncs.h"
#include "../../../maths/vec2.h"
#include "../../../maths/vec2_int.h"
#include "../../../maths/vec3.h"
#include "../../system/window/window.h"
#include "ortho_projection_info.h"

namespace spright
{
namespace engine
{
    using namespace ::spright::maths;

    class Camera
    {
    public:
        Camera(const BoundsInt &screenBounds, float near, float far, int zoomFactor = 17);

        virtual ~Camera() = default;

        virtual void setZoom(float zoom);

        virtual void zoomIn();

        virtual void zoomOut();

        float getZoom();

        const Mat4 &getProjectionMatrix() const;

        const Mat4 &getViewMatrix() const;

        virtual Vec2 screenToWorldPos(float x, float y) const;

        virtual Vec2Int worldToScreenPos(float x, float y) const;

        void setScreenBounds(const BoundsInt &screenBounds);

        virtual Camera *clone() const = 0;

        virtual bool operator==(const Camera &rhs) const;

        virtual bool operator!=(const Camera &rhs) const;

    protected:
        float getScaleFactor() const;

    private:
        virtual void updateProjectionMatrix() const = 0;

    protected:
        Mat4 m_View;

        mutable Mat4 m_Proj;

        Vec2 m_Translate;

        float m_Near;

        float m_Far;

        float m_Z = 0.5f;

        float m_Zoom = 1.0f;

        int m_ZoomFactor = 1;

        BoundsInt m_ScreenBounds;
    };
} // namespace engine
} // namespace spright
