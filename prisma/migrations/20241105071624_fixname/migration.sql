/*
  Warnings:

  - You are about to drop the column `hashedPassoword` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashedPassoword",
ADD COLUMN     "hashedPassword" TEXT;
