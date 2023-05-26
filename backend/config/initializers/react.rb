require 'action_controller/metal/renderers'

ActionController::Renderers.add :react do |props, opts|
  render react.render props
end
