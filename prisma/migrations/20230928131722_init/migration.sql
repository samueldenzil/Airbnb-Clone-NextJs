-- CreateTable
CREATE TABLE "airbnb_account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "airbnb_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airbnb_user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "hashedPassword" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "favoriteIds" TEXT[],

    CONSTRAINT "airbnb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airbnb_listing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "roomCount" INTEGER NOT NULL,
    "bathroomCount" INTEGER NOT NULL,
    "guestCount" INTEGER NOT NULL,
    "locationValue" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "airbnb_listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airbnb_reservation" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,

    CONSTRAINT "airbnb_reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "airbnb_account_providerId_providerAccountId_key" ON "airbnb_account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "airbnb_user_email_key" ON "airbnb_user"("email");

-- CreateIndex
CREATE INDEX "airbnb_listing_userId_idx" ON "airbnb_listing"("userId");

-- CreateIndex
CREATE INDEX "airbnb_reservation_userId_idx" ON "airbnb_reservation"("userId");

-- CreateIndex
CREATE INDEX "airbnb_reservation_listingId_idx" ON "airbnb_reservation"("listingId");

-- AddForeignKey
ALTER TABLE "airbnb_account" ADD CONSTRAINT "airbnb_account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "airbnb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "airbnb_listing" ADD CONSTRAINT "airbnb_listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "airbnb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "airbnb_reservation" ADD CONSTRAINT "airbnb_reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "airbnb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "airbnb_reservation" ADD CONSTRAINT "airbnb_reservation_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "airbnb_listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
