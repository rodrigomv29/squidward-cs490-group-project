-- CreateTable
CREATE TABLE "Search" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "search" TEXT,
    "userID" INTEGER,
    CONSTRAINT "Search_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
