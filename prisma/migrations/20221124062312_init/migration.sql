-- CreateEnum
CREATE TYPE "Role" AS ENUM ('root', 'admin', 'user');

-- CreateTable
CREATE TABLE "ContactForm" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phone" STRING,
    "message" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password_hash" STRING NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "tag" STRING NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginToken" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" STRING NOT NULL,

    CONSTRAINT "LoginToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imageLink" (
    "id" STRING NOT NULL,
    "image_url" STRING NOT NULL,

    CONSTRAINT "imageLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "content" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageLinkId" STRING NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LoginToken_userId_key" ON "LoginToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LoginToken_value_key" ON "LoginToken"("value");

-- CreateIndex
CREATE UNIQUE INDEX "imageLink_id_key" ON "imageLink"("id");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_imageLinkId_fkey" FOREIGN KEY ("imageLinkId") REFERENCES "imageLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
