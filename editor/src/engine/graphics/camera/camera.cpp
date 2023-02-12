#include "camera.h"

namespace spright { namespace engine {
	
	Camera::Camera(float windowWidth, float windowHeight, Dimensions documentDimensions, float near, float far) : m_WindowWidth(windowWidth), m_WindowHeight(windowHeight), m_Near(near), m_Far(far)
	{
		m_DocumentDimensions = documentDimensions;
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
		float newWidth = m_CameraDim.getWidth() + deltaWidth;
		float newHeight = newWidth / getAspectRatio();

		m_Zoom = m_InitialWidth / newWidth;
		m_CameraDim.setSize(newWidth, newHeight);
		updateAspectRatio();
	}

	float Camera::getZoom()
	{
		return m_Zoom;
	}

	const Dimensions& Camera::getDimensions() const
	{
		return m_CameraDim;
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
		m_CameraDim = getCameraDimensions();

		m_InitialWidth = m_CameraDim.right - m_CameraDim.left;
		m_View = Mat4::lookAt(Vec3(0, 0, z), Vec3(0, 0, 0), Vec3(0, 1, 0));
		m_Zoom = 1.0f;
		m_Translate.x = 0;
		m_Translate.y = 0;

		updateAspectRatio();
	}

	void Camera::updateAspectRatio()
	{
		m_AspectRatio = (m_CameraDim.right - m_CameraDim.left) / (m_CameraDim.top - m_CameraDim.bottom);
		m_ProjectionMatrix = Mat4::otrthographic(m_CameraDim.left, m_CameraDim.right, m_CameraDim.bottom, m_CameraDim.top, m_Near, m_Far);
	}

	Vec2 Camera::screenToModel(Vec2 screen) {
		return Vec2((screen.x) / getZoom() + m_Translate.x, (screen.y) / getZoom() + m_Translate.y);
	}

	Vec2 Camera::screenToCameraPos(double x, double y) {
		float w = m_CameraDim.getWidth();
		float h = m_CameraDim.getHeight();

		Mat4 mat4 = Mat4::identity();
		mat4 = mat4.scale(Vec3(m_CameraDim.getWidth() / m_WindowWidth, m_CameraDim.getHeight() / m_WindowHeight, 1));

		Vec4 result = mat4 * Vec4(x, -y, 0.0f, 1.0f);

		Mat4 mat2 = Mat4::identity();
		mat2 = mat2.translation(Vec3(m_Translate.x - w / 2.0f, m_Translate.y + h / 2.0f, 0.0f));

		result = mat2 * result;

		return Vec2(result.x, result.y);
	}

	Dimensions Camera::getCameraDimensions()
	{
		float ratio = m_WindowWidth / m_WindowHeight;

		float width;
		float height;

		if (m_DocumentDimensions.getWidth() / ratio > m_DocumentDimensions.getHeight())
		{
			width = m_DocumentDimensions.getWidth();
			height = width / ratio;
		}
		else
		{
			height = m_DocumentDimensions.getHeight();
			width = height * ratio; // docDimensions.getRatio();
		}

		return Dimensions(-width / 2.0f, width / 2.0f, -height / 2.0f, height / 2.0f);
	}
}}