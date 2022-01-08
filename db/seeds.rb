# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

SpriteSheet.create(columns: 14, name: "Player", path: "player", tileHeight: 64, tileWidth: 64, tiles: 22)
SpriteSheet.create(columns: 14, name: "Hero", path: "hero", tileHeight: 64, tileWidth: 64, tiles: 22)
