/*
  Warnings:

  - The primary key for the `OriginalDocument` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "OriginalDocument" DROP CONSTRAINT "OriginalDocument_pkey",
ALTER COLUMN "document_id" DROP DEFAULT,
ALTER COLUMN "document_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "OriginalDocument_pkey" PRIMARY KEY ("document_id");
DROP SEQUENCE "OriginalDocument_document_id_seq";
