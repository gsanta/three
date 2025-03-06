# Set up development

`npm install`

Run migrations: npx prisma migrate deploy
Seed db: npx prisma db seed


# Tests
Run a single feature file: npx cucumber-js 'test/features/pole.feature'

# Load model

https://gltf.pmnd.rs/

# Migration

Start a migration from scratch
 - delete old migration files
 - create a new initial migration: npx prisma migrate dev --name init
