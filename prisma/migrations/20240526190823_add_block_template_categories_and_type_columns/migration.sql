-- AlterTable
ALTER TABLE "BlockTemplate" ADD COLUMN     "categories" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'unknown';
