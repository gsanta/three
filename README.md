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

Run migrations on an empty db
 - npx prisma migrate deploy

Drop and reseed db:
 - npx prisma migrate reset

# AWS server

ssh -i keys/web_server_key.pem ubuntu@ec2-3-72-250-35.eu-central-1.compute.amazonaws.com
