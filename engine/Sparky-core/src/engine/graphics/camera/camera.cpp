#include "camera.h"

namespace engine { namespace graphics {
	
	Camera::Camera(Window* window, OrthoProjectionInfo initialProjectionInfo) : m_Window(window), m_InitialProjectionInfo(initialProjectionInfo)
	{
		m_InitialWidth = initialProjectionInfo.right - initialProjectionInfo.left;
		m_View = Mat4::lookAt(Vec3(0, 0, z), Vec3(0, 0, 0), Vec3(0, 1, 0));
		setProjectionInfo(initialProjectionInfo);
	}

	void Camera::translate2D(Vec2 translate)
	{
		Vec3 eye(m_Center2D.x + translate.x, m_Center2D.y + translate.y, z);
		Vec3 at(m_Center2D.x + translate.x, m_Center2D.y + translate.y, 0);
		m_Center2D.x = eye.x;
		m_Center2D.y = eye.y;
		m_View  = Mat4::lookAt(eye, at, Vec3(0, 1, 0));
	}

	void Camera::translateZ(float val)
	{
		z += val / 10.0f;
		Vec3 eye(m_Center2D.x, m_Center2D.y, z);
		Vec3 at(m_Center2D.x, m_Center2D.y, 0);
		m_View = Mat4::lookAt(eye, at, Vec3(0, 1, 0));
	}

	void Camera::setProjectionInfo(OrthoProjectionInfo projectionInfo)
	{
		float width = projectionInfo.right - projectionInfo.left;
		m_Zoom = m_InitialWidth / width;
		m_ProjectionInfo = projectionInfo;
		updateAspectRatio();
		m_ProjectionMatrix = Mat4::otrthographic(m_ProjectionInfo.left, m_ProjectionInfo.right, m_ProjectionInfo.bottom, m_ProjectionInfo.top, -1.0f, 1.0f);
	}
	void Camera::updateAspectRatio()
	{
		aspectRatio = (m_ProjectionInfo.right - m_ProjectionInfo.left) / (m_ProjectionInfo.top - m_ProjectionInfo.bottom);
	}

	void Camera::updateWindowSize(OrthoProjectionInfo initialProjectionInfo)
	{
		m_InitialWidth = initialProjectionInfo.right - initialProjectionInfo.left;
		m_View = Mat4::lookAt(Vec3(0, 0, z), Vec3(0, 0, 0), Vec3(0, 1, 0));
		setProjectionInfo(initialProjectionInfo);
	}

	Vec2 Camera::screenToModel(Vec2 screen) {
		return Vec2((screen.x) / getZoom() + m_Center2D.x, (screen.y) / getZoom() + m_Center2D.y);
	}

	Vec2 Camera::screenToCameraPos(double x, double y) {
		float w = m_InitialProjectionInfo.getWidth();
		float h = m_InitialProjectionInfo.getHeight();
		float xPos = x * w / m_Window->getWidth() - w / 2;
		float yPos = h / 2 - y * h / m_Window->getHeight();

		return Vec2(xPos, yPos);
	}


}}