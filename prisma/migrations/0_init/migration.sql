-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'OWNER');

-- CreateEnum
CREATE TYPE "Group" AS ENUM ('VIP_GROUP', 'PUBLIC_GROUP');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('MESSAGE', 'IMAGE', 'VIDEO', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ActionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "telegram_id" INTEGER NOT NULL,
    "pocket_option_id" INTEGER,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "username" TEXT,
    "photo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Draw" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "end_at" TIMESTAMP(3),
    "max_participants" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "requires_group" BOOLEAN NOT NULL DEFAULT false,
    "requires_pocket" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Draw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrawParticipant" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "draw_id" TEXT NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_winner" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DrawParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentorship" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "start_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3),
    "group" "Group" NOT NULL DEFAULT 'PUBLIC_GROUP',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mentorship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorshipParticipant" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "mentorship_id" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "is_winner" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentorshipParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAction" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "mentorship_id" TEXT NOT NULL,
    "action_type" "ActionType" NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 1,
    "status" "ActionStatus" NOT NULL DEFAULT 'PENDING',
    "description" TEXT,
    "status_updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_id_key" ON "User"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_pocket_option_id_key" ON "User"("pocket_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "DrawParticipant_user_id_draw_id_key" ON "DrawParticipant"("user_id", "draw_id");

-- CreateIndex
CREATE UNIQUE INDEX "MentorshipParticipant_mentorship_id_user_id_key" ON "MentorshipParticipant"("mentorship_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAction_user_id_mentorship_id_key" ON "UserAction"("user_id", "mentorship_id");

-- AddForeignKey
ALTER TABLE "DrawParticipant" ADD CONSTRAINT "DrawParticipant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrawParticipant" ADD CONSTRAINT "DrawParticipant_draw_id_fkey" FOREIGN KEY ("draw_id") REFERENCES "Draw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipParticipant" ADD CONSTRAINT "MentorshipParticipant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipParticipant" ADD CONSTRAINT "MentorshipParticipant_mentorship_id_fkey" FOREIGN KEY ("mentorship_id") REFERENCES "Mentorship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_mentorship_id_fkey" FOREIGN KEY ("mentorship_id") REFERENCES "Mentorship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

