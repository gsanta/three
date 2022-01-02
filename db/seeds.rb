# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

User.create!([{
                email: 'user1@test.com',
                password: 'Password1234',
                slug: '10740f60-df14-4355-a03e-bf48beb78dac'
              },
              {
                email: 'user2@test.com',
                password: 'Password1234',
                slug: '2887e3f6-9ddd-4e82-b99e-b7fc983de7ec'
              }
             ])

p "Created #{User.count} movies"
