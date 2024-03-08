import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();
const allCards = await prisma.card.findMany({});

async function callLog() {
    axios.post("http://localhost:80/logs/create", {
        data: {
            cardUid:
                allCards[Math.floor(Math.random() * allCards.length) + 1].uid,
        },
    });
}

function main() {
    const randomTime = Math.floor(Math.random() * 10000) + 1000;
    callLog();
    setTimeout(main, randomTime);
}

main();
