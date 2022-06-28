# frozen_string_literal: true

# Application Controller
class ApplicationController < ActionController::API
  include ActionController::Cookies
  after_action :set_csrf_cookie

  def render_jsonapi_response(resource)
    if resource.nil?
      render json: { error: 'not-found' }.to_json, status: 404
    elsif resource.errors.empty?
      render jsonapi: resource
    else
      render jsonapi_errors: resource.errors, status: 400
    end
  end

  protected

  def set_csrf_cookie
    cookies["X-CSRF-Token"] = form_authenticity_token
  end
end
