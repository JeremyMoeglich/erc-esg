/*
  Warnings:

  - You are about to drop the column `show_in_galery` on the `imageLink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "imageLink" DROP COLUMN "show_in_galery";
ALTER TABLE "imageLink" ADD COLUMN     "show_in_gallery" BOOL NOT NULL DEFAULT false;
