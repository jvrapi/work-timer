/*
  Warnings:

  - You are about to drop the column `finished_lunch_at` on the `work_times` table. All the data in the column will be lost.
  - You are about to drop the column `started_lunch_at` on the `work_times` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `work_times` DROP COLUMN `finished_lunch_at`,
    DROP COLUMN `started_lunch_at`;
