# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :html, :js, :json

  after_action :set_csrf_cookie

  def create
    super
  end

  private

  def set_csrf_cookie
    cookies["X-CSRF-Token"] = form_authenticity_token
  end
end
