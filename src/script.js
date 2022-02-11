const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    // reset db
    console.log("Deleting entire db...");
    await prisma.link.deleteMany({});

    // insert data
    console.log("Inserting data...")
    const newLink = await prisma.link.create({
        data: {
            description: "Fullstack tutorial for GraphQL",
            url: "www.howtographql.com"
        }
    })
    await prisma.link.create({
        data: {
            description: "Search engine",
            url: "www.google.com"
        }
    })
    const allLinks = await prisma.link.findMany();
    console.log(allLinks);
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })