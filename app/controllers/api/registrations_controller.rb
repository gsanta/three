# class Users::RegistrationsController < Devise::RegistrationsController
#   respond_to :json

#   private

#   def respond_with(resource, _opts = {})
#     register_success && return if resource.persisted?

#     register_failed
#   end

#   def register_success
#     render json: { message: 'Signed up sucessfully.' }
#   end

#   def register_failed
#     render json: { message: "Something went wrong." }
#   end
# end

class Api::RegistrationsController < Devise::RegistrationsController

  def create
    build_resource(sign_up_params)
    resource.save
    sign_up(resource_name, resource) if resource.persisted?

    render_jsonapi_response(resource)
  end
end
