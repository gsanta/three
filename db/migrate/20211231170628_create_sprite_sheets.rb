class CreateSpriteSheets < ActiveRecord::Migration[6.0]
  def change
    create_table :sprite_sheets do |t|
      t.integer :columns
      t.string :name
      t.string :path
      t.integer :tileHeight
      t.integer :tiles
      t.integer :tileWidth

      t.timestamps
    end
  end
end
