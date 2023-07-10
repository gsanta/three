

module ErrorHandling
  extend ActiveSupport::Concern

  included do
    rescue_from ActionController::ParameterMissing do |error|
      render_error error.original_message, :bad_request
    end

    rescue_from ActiveRecord::RecordNotFound do |error|
      render_error error.message, :not_found
    end
  end

  def render_error(message, status)
    render json: { message: message }, status: status
  end

end
