class AddUserSlugToPDocument < ActiveRecord::Migration[6.0]
  def change
    add_column :p_documents, :user_slug, :string
  end
end
