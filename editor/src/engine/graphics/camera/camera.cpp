#include "camera.h"

namespace engine { namespace graphics {
	
	Camera::Camera(float windowWidth, float windowHeight, Dimensions canvasDimensions, float near, float far) : m_WindowWidth(windowWidth), m_WindowHeight(windowHeight), m_Near(near), m_Far(far)
	{
		m_CanvasDimensions = canvasDimensions;
		updateWindowSize(windowWidth, windowHeight);
	}

	void Camera::translate2D(Vec2 translate)
	{
		Vec3 eye(m_Translate.x + translate.x, m_Translate.y + translate.y, z);
		Vec3 at(m_Translate.x + translate.x, m_Translate.y + translate.y, 0);
		m_Translate.x = eye.x;
		m_Translate.y = eye.y;
		m_View  = Mat4::lookAt(eye, at, Vec3(0, 1, 0));
	}

	void Camera::translateZ(float val)
	{
		z += val / 10.0f;
		Vec3 eye(m_Translate.x, m_Translate.y, z);
		Vec3 at(m_Translate.x, m_Translate.y, 0);
		m_View = Mat4::lookAt(eye, at, Vec3(0, 1, 0));
	}

	void Camera::zoom(float deltaWidth)
	{
		float newWidth = m_Dimensions.getWidth() + deltaWidth;
		float newHeight = newWidth / getAspectRatio();

		m_Zoom = m_InitialWidth / newWidth;
		m_Dimensions.setSize(newWidth, newHeight);
		updateAspectRatio();
	}

	float Camera::getZoom()
	{
		return m_Zoom;
	}

	const Dimensions& Camera::getDimensions() const
	{
		return m_Dimensions;
	}

	Mat4 Camera::getProjectionMatrix() {
		return m_ProjectionMatrix;
	}

	float Camera::getAspectRatio() const {
		return m_AspectRatio;
	}

	Mat4& Camera::getView() {
		return m_View;
	}

	Vec2 Camera::getCenter2D() {
		return m_Translate;
	}

	void Camera::updateWindowSize(float windowWidth, float windowHeight)
	{
		m_WindowWidth = windowWidth;
		m_WindowHeight = windowHeight;
		m_Dimensions = getCameraDimensions();

		m_InitialWidth = m_Dimensions.right - m_Dimensions.left;
		m_View = Mat4::lookAt(Vec3(0, 0, z), Vec3(0, 0, 0), Vec3(0, 1, 0));
		m_Zoom = 1.0f;
		m_Translate.x = 0;
		m_Translate.y = 0;

		updateAspectRatio();
	}

	void Camera::updateAspectRatio()
	{
		m_AspectRatio = (m_Dimensions.right - m_Dimensions.left) / (m_Dimensions.top - m_Dimensions.bottom);
		m_ProjectionMatrix = Mat4::otrthographic(m_Dimensions.left, m_Dimensions.right, m_Dimensions.bottom, m_Dimensions.top, m_Near, m_Far);
	}

	Vec2 Camera::screenToModel(Vec2 screen) {
		return Vec2((screen.x) / getZoom() + m_Translate.x, (screen.y) / getZoom() + m_Translate.y);
	}

	Vec2 Camera::screenToCameraPos(double x, double y) {
		float w = m_Dimensions.getWidth();
		float h = m_Dimensions.getHeight();
		float xPos = x * w / m_WindowWidth - w / 2;
		float yPos = h / 2 - y * h / m_WindowHeight;

		return Vec2(xPos / getZoom() + m_Translate.x, yPos / getZoom() + m_Translate.y);
	}

	Dimensions Camera::getCameraDimensions()
	{
		float ratio = m_WindowWidth / m_WindowHeight;

		float width;
		float height;

		if (m_CanvasDimensions.getWidth() / ratio > m_CanvasDimensions.getHeight())
		{
			width = m_CanvasDimensions.getWidth();
			height = width / ratio;
		}
		else
		{
			height = m_CanvasDimensions.getHeight();
			width = height * ratio; // docDimensions.getRatio();
		}

		return Dimensions(-width / 2.0f, width / 2.0f, -height / 2.0f, height / 2.0f);
	}
}}