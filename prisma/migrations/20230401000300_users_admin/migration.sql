/*
  Warnings:

  - You are about to drop the column `rol` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfUser` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "rol",
DROP COLUMN "typeOfUser";

-- CreateTable
CREATE TABLE "userAdmi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "userAdmi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userAdmi_nickName_key" ON "userAdmi"("nickName");

-- CreateIndex
CREATE UNIQUE INDEX "userAdmi_email_key" ON "userAdmi"("email");
