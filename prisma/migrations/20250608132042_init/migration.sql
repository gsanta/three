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
CREATE TABLE "BlockType" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "decorations" JSONB NOT NULL DEFAULT '[]',
    "decorationData" JSONB,
    "parts" JSONB,
    "partDetails" JSONB,
    "path" TEXT,
    "type" TEXT NOT NULL,
    "animations" JSONB,

    CONSTRAINT "BlockType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BlockCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockAddMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "executeAfterRender" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BlockAddMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockAddMethodsOnCategories" (
    "addMethodName" TEXT NOT NULL,
    "sourceCategoryName" TEXT NOT NULL,
    "targetCategoryName" TEXT,
    "targetPartRole" TEXT,
    "sourcePartRole" TEXT,
    "connectionType" TEXT,

    CONSTRAINT "BlockAddMethodsOnCategories_pkey" PRIMARY KEY ("addMethodName","sourceCategoryName")
);

-- CreateTable
CREATE TABLE "BlockContextMenuAction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BlockContextMenuAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockContextMenuActionOnCategories" (
    "contextMenuActionName" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryName2" TEXT NOT NULL,

    CONSTRAINT "BlockContextMenuActionOnCategories_pkey" PRIMARY KEY ("contextMenuActionName","categoryName","categoryName2")
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
CREATE UNIQUE INDEX "BlockType_type_key" ON "BlockType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "BlockCategory_name_key" ON "BlockCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BlockAddMethod_name_key" ON "BlockAddMethod"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BlockContextMenuAction_name_key" ON "BlockContextMenuAction"("name");

-- AddForeignKey
ALTER TABLE "BlockType" ADD CONSTRAINT "BlockType_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "BlockCategory"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockAddMethodsOnCategories" ADD CONSTRAINT "BlockAddMethodsOnCategories_addMethodName_fkey" FOREIGN KEY ("addMethodName") REFERENCES "BlockAddMethod"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockAddMethodsOnCategories" ADD CONSTRAINT "BlockAddMethodsOnCategories_sourceCategoryName_fkey" FOREIGN KEY ("sourceCategoryName") REFERENCES "BlockCategory"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockContextMenuActionOnCategories" ADD CONSTRAINT "BlockContextMenuActionOnCategories_contextMenuActionName_fkey" FOREIGN KEY ("contextMenuActionName") REFERENCES "BlockContextMenuAction"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockContextMenuActionOnCategories" ADD CONSTRAINT "BlockContextMenuActionOnCategories_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "BlockCategory"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockContextMenuActionOnCategories" ADD CONSTRAINT "BlockContextMenuActionOnCategories_categoryName2_fkey" FOREIGN KEY ("categoryName2") REFERENCES "BlockCategory"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Snapshot" ADD CONSTRAINT "Snapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
