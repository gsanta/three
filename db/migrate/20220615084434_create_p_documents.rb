class CreatePDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :p_documents do |t|
      t.string :name
      t.json :doc

      t.timestamps
    end
  end
end
