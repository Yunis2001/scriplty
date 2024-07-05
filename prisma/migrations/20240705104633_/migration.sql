/*
  Warnings:

  - The primary key for the `OriginalDocument` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `document_id` column on the `OriginalDocument` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "OriginalDocument" DROP CONSTRAINT "OriginalDocument_pkey",
DROP COLUMN "document_id",
ADD COLUMN     "document_id" SERIAL NOT NULL,
ADD CONSTRAINT "OriginalDocument_pkey" PRIMARY KEY ("document_id");
