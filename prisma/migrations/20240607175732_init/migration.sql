-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'credentials',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockTye" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "decorations" JSONB NOT NULL DEFAULT '[]',
    "parts" JSONB,
    "partDetails" JSONB,
    "path" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "BlockTye_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Snapshot" (
    "id" TEXT NOT NULL,
    "state" JSONB,
    "userId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BlockTye_type_key" ON "BlockTye"("type");

-- AddForeignKey
ALTER TABLE "Snapshot" ADD CONSTRAINT "Snapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;