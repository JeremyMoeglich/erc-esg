/*
  Warnings:

  - You are about to drop the `GaleryImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GaleryImage" DROP CONSTRAINT "GaleryImage_imageLinkId_fkey";

-- AlterTable
ALTER TABLE "imageLink" ADD COLUMN     "show_in_galery" BOOL NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "GaleryImage";
