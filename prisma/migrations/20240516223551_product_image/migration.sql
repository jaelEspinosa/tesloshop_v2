-- CreateTable
CREATE TABLE "PoductImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "PoductImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PoductImage" ADD CONSTRAINT "PoductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
