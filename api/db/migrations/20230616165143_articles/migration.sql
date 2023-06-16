/*
  Warnings:

  - Added the required column `category` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "urlToImage" TEXT NOT NULL,
    "publishedAt" TEXT NOT NULL,
    "content" TEXT NOT NULL
);
INSERT INTO "new_Article" ("author", "content", "description", "id", "publishedAt", "title", "url", "urlToImage") SELECT "author", "content", "description", "id", "publishedAt", "title", "url", "urlToImage" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
