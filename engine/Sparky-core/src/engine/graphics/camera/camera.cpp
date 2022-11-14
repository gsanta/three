#include "camera.h"

namespace spright_engine { namespace graphics {
	
	Camera::Camera(): m_ProjectionInfo(-16.0f, 16.0f, -9.0f, 9.0f)
	{
		m_InitialWidth = m_ProjectionInfo.right - m_ProjectionInfo.left;
		m_View = maths::Mat4::lookAt(maths::Vec3(0, 0, z), maths::Vec3(0, 0, 0), maths::Vec3(0, 1, 0));
		updateAspectRatio();
	}

	void Camera::translate2D(spright_engine::maths::Vec2 translate)
	{
		maths::Vec3 eye(m_Center2D.x + translate.x, m_Center2D.y + translate.y, z);
		maths::Vec3 at(m_Center2D.x + translate.x, m_Center2D.y + translate.y, 0);
		m_Center2D.x = eye.x;
		m_Center2D.y = eye.y;
		m_View  = maths::Mat4::lookAt(eye, at, maths::Vec3(0, 1, 0));
	}

	void Camera::translateZ(float val)
	{
		z += val / 10.0f;
		maths::Vec3 eye(m_Center2D.x, m_Center2D.y, z);
		maths::Vec3 at(m_Center2D.x, m_Center2D.y, 0);
		m_View = maths::Mat4::lookAt(eye, at, maths::Vec3(0, 1, 0));
	}

	void Camera::setProjectionInfo(OrthoProjectionInfo projectionInfo)
	{
		float width = projectionInfo.right - projectionInfo.left;
		m_Zoom = m_InitialWidth / width;
		m_ProjectionInfo = projectionInfo;
		updateAspectRatio();
		m_ProjectionMatrix = spright_engine::maths::Mat4::otrthographic(m_ProjectionInfo.left, m_ProjectionInfo.right, m_ProjectionInfo.bottom, m_ProjectionInfo.top, -1.0f, 1.0f);
	}
	void Camera::updateAspectRatio()
	{
		aspectRatio = (m_ProjectionInfo.right - m_ProjectionInfo.left) / (m_ProjectionInfo.top - m_ProjectionInfo.bottom);
	}
}}