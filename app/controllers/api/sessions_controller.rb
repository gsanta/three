class Api::SessionsController < Devise::SessionsController

  private

  def respond_with(resource, _opts = {})
    puts resource.inspect
    render_jsonapi_response(resource)
  end

  def respond_to_on_destroy
    head :no_content
  end

end
