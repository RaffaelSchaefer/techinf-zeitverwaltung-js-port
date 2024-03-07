import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const demoSize = 100;
const prisma = new PrismaClient();
const positionsNames = [
    "Frontend Developer",
    "DevOps Developer",
    "Backend Developer",
    "UX Designer",
];

for (const positionName of positionsNames) {
    await prisma.position.create({
        data: {
            name: positionName,
        },
    });
}

for (let i = 0; i < demoSize; i++) {
    const user = await prisma.user.create({
        data: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            positionId: Math.floor(Math.random() * positionsNames.length) + 1,
        },
    });
    const userAddress = await prisma.address.create({
        data: {
            User: {
                connect: {
                    id: user.id,
                },
            },
            street_name: faker.location.street(),
            house_number: faker.location.buildingNumber(),
            town_name: faker.location.city(),
            postal_code: faker.location.zipCode(),
            country: faker.location.country(),
        },
    });
}

for (let i = 0; i < demoSize; i++) {
    const isEmptyCard = Math.random() < 0.05;
    const card = await prisma.card.create({
        data: {
            ...(isEmptyCard
                ? {}
                : {
                      User: {
                          connect: {
                              id: Math.floor(Math.random() * demoSize) + 1,
                          },
                      },
                  }),
            uid: Math.floor(Math.random() * 100000000000).toString(16),
        },
    });
}
