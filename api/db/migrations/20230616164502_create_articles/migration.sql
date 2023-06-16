-- CreateTable
CREATE TABLE "Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "urlToImage" TEXT NOT NULL,
    "publishedAt" TEXT NOT NULL,
    "content" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" DATETIME,
    "general" BOOLEAN NOT NULL DEFAULT true,
    "business" BOOLEAN NOT NULL DEFAULT false,
    "health" BOOLEAN NOT NULL DEFAULT false,
    "science" BOOLEAN NOT NULL DEFAULT false,
    "sports" BOOLEAN NOT NULL DEFAULT false,
    "technology" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("email", "hashedPassword", "id", "resetToken", "resetTokenExpiresAt", "salt") SELECT "email", "hashedPassword", "id", "resetToken", "resetTokenExpiresAt", "salt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
