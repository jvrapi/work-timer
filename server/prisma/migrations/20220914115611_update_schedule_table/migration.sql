-- AlterTable
ALTER TABLE `schedules` MODIFY `started_at` TIME NOT NULL,
    MODIFY `finished_at` TIME NULL,
    MODIFY `started_lunch_at` TIME NULL,
    MODIFY `finished_lunch_at` TIME NULL;
