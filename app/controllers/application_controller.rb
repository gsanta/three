# frozen_string_literal: true

# Application Controller
class ApplicationController < ActionController::API
  def render_jsonapi_response(resource)
    if resource.nil?
      render json: { error: 'not-found' }.to_json, status: 404
    elsif resource.errors.empty?
      render jsonapi: resource
    else
      render jsonapi_errors: resource.errors, status: 400
    end
  end
end
