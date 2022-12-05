-- CreateTable
CREATE TABLE "GaleryImage" (
    "id" STRING NOT NULL,
    "imageLinkId" STRING NOT NULL,

    CONSTRAINT "GaleryImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GaleryImage" ADD CONSTRAINT "GaleryImage_imageLinkId_fkey" FOREIGN KEY ("imageLinkId") REFERENCES "imageLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
