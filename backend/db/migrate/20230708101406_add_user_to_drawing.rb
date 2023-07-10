class AddUserToDrawing < ActiveRecord::Migration[7.0]
  def change
    add_reference :drawings, :user, null: false, foreign_key: true
  end
end
