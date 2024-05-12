import { Prisma, type UserSettings } from "@prisma/client";
import { prisma } from "../db.server";

const getUserSettings = async (
  userId: string
): Promise<UserSettings | null> => {
  const userSettings = await prisma.userSettings.findUnique({
    where: { userId },
  });

  return userSettings;
};

type SavingSettingsInput = {
  emergencyFund: number;
  investmentRate: number;
  savingsRate: number;
};

const updateUserSavingSettings = async (
  { emergencyFund, investmentRate, savingsRate }: SavingSettingsInput,
  userId: string
) => {
  const userSettings = await prisma.userSettings.findUnique({
    where: { userId },
  });

  if (!userSettings) {
    await prisma.userSettings.create({
      data: {
        userId,
        emergencyFund: new Prisma.Decimal(emergencyFund),
        investmentRate,
        savingsRate,
      },
    });
  } else {
    userSettings.emergencyFund = new Prisma.Decimal(emergencyFund);
    userSettings.investmentRate = investmentRate;
    userSettings.savingsRate = savingsRate;

    await prisma.userSettings.update({
      where: { userId },
      data: userSettings,
    });
  }
};

export { getUserSettings, updateUserSavingSettings };
