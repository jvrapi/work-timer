-- CreateTable
CREATE TABLE `work_times` (
    `id` VARCHAR(191) NOT NULL,
    `started_at` DATETIME(3) NOT NULL,
    `finished_at` DATETIME(3) NULL,
    `started_lunch_at` DATETIME(3) NULL,
    `finished_lunch_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
