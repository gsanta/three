# frozen_string_literal: true

class ListDrawings

  def initialize(user_id)
    @user_id = user_id
  end

  def execute
    Drawing.where(user_id: @user_id).order(updated_at: :desc).limit 10
  end
end
