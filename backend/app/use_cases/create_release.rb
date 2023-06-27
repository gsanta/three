# frozen_string_literal: true

class CreateDrawing

  def initialize(create_params)
    @create_params = create_params
  end

  def execute
    Drawing.create! @create_params
  end
end
