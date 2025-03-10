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
CREATE TABLE "BlockCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BlockCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockType" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "decorations" JSONB NOT NULL DEFAULT '[]',
    "parts" JSONB,
    "partDetails" JSONB,
    "path" TEXT,
    "type" TEXT NOT NULL,
    "animations" JSONB,

    CONSTRAINT "BlockType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockAddMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BlockAddMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockAddMethodsOnCategories" (
    "addMethodName" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "executeAfterRender" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BlockAddMethodsOnCategories_pkey" PRIMARY KEY ("addMethodName","categoryName")
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
CREATE UNIQUE INDEX "BlockCategory_name_key" ON "BlockCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BlockType_type_key" ON "BlockType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "BlockAddMethod_name_key" ON "BlockAddMethod"("name");

-- AddForeignKey
ALTER TABLE "BlockType" ADD CONSTRAINT "BlockType_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "BlockCategory"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockAddMethodsOnCategories" ADD CONSTRAINT "BlockAddMethodsOnCategories_addMethodName_fkey" FOREIGN KEY ("addMethodName") REFERENCES "BlockAddMethod"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockAddMethodsOnCategories" ADD CONSTRAINT "BlockAddMethodsOnCategories_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "BlockCategory"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Snapshot" ADD CONSTRAINT "Snapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
