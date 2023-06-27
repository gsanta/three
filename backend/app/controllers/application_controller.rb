
class ApplicationController < ActionController::Base
  include ReactRenderer::DSL
  include ErrorHandling
end
