-- CreateTable
CREATE TABLE `Referral` (
    `referral_id` INTEGER NOT NULL AUTO_INCREMENT,
    `referrer_name` VARCHAR(191) NOT NULL,
    `referrer_email` VARCHAR(191) NOT NULL,
    `referrer_phone` VARCHAR(191) NOT NULL,
    `referee_name` VARCHAR(191) NOT NULL,
    `referee_email` VARCHAR(191) NOT NULL,
    `referee_phone` VARCHAR(191) NOT NULL,
    `vertical` VARCHAR(191) NOT NULL,
    `program` VARCHAR(191) NOT NULL,
    `referred_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Referral_referrer_email_idx`(`referrer_email`),
    INDEX `Referral_referee_email_idx`(`referee_email`),
    PRIMARY KEY (`referral_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
