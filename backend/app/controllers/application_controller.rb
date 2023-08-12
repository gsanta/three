
class ApplicationController < ActionController::Base
  include ReactRenderer::DSL
  include ErrorHandling
  include ResponseHelper
end
