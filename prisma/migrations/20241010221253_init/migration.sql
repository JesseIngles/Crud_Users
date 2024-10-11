-- CreateTable
CREATE TABLE "user" (
    "Id" SERIAL NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Ocupacao" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");
