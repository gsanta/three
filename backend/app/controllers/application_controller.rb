
class ApplicationController < ActionController::Base
  include ReactRenderer::DSL
  include ErrorHandling
  include ResponseHelper

  after_action :set_csrf_cookie


  def set_csrf_cookie
    cookies["X-CSRF-Token"] = form_authenticity_token
  end
end
