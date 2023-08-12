

module ErrorHandling
  extend ActiveSupport::Concern

  included do
    rescue_from ActionController::ParameterMissing do |error|
      render_error error.original_message, :bad_request
    end

    rescue_from ActiveRecord::RecordNotFound do |error|
      render_error error.message, :not_found
    end

    rescue_from Errors::InvalidCredentials do |error|
      render_error_with_code :unauthorized, "ERR_INVALID_CREDENTIALS", 'Invalid credentials'
    end
  end

  def render_error(message, status)
    render json: { message: message }, status: status
  end

  def render_error_with_code(status, code, message)
    render json: { code: code, message: message }, status: status
  end
end
