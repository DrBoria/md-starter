const { PrismaClient } = require("@prisma/client");

async function seedDefaultRoles() {
  const prisma = new PrismaClient();

  try {
    // Check if roles exist
    const existingRoles = await prisma.role.findMany();
    if (
        !existingRoles.some((role) =>
        ["Admin", "User"].includes(role.name),
      )
    ) {
      // Insert default roles if they don't exist
      await prisma.role.createMany({
        data: [
          { name: "Admin" },
          { name: "User" },
        ],
      });
      console.log("Default roles seeded successfully.");
    } else {
      console.log("Default roles already exist.");
    }
  } catch (error) {
    console.error("Error seeding default roles:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDefaultRoles().catch(console.error);
