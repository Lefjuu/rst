import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const usersData = [
    {
      first_name: "John",
      last_name: "Doe",
      initials: "JD",
      email: "john.doe@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      initials: "JS",
      email: "jane.smith@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Alice",
      last_name: "Johnson",
      initials: "AJ",
      email: "alice.johnson@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Bob",
      last_name: "Brown",
      initials: "BB",
      email: "bob.brown@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Charlie",
      last_name: "Davis",
      initials: "CD",
      email: "charlie.davis@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Emily",
      last_name: "Clark",
      initials: "EC",
      email: "emily.clark@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Frank",
      last_name: "Miller",
      initials: "FM",
      email: "frank.miller@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Grace",
      last_name: "Wilson",
      initials: "GW",
      email: "grace.wilson@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Henry",
      last_name: "Moore",
      initials: "HM",
      email: "henry.moore@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Ivy",
      last_name: "Taylor",
      initials: "IT",
      email: "ivy.taylor@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Jack",
      last_name: "Anderson",
      initials: "JA",
      email: "jack.anderson@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Karen",
      last_name: "Thomas",
      initials: "KT",
      email: "karen.thomas@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Leo",
      last_name: "Martinez",
      initials: "LM",
      email: "leo.martinez@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Mia",
      last_name: "Harris",
      initials: "MH",
      email: "mia.harris@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Nathan",
      last_name: "White",
      initials: "NW",
      email: "nathan.white@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Olivia",
      last_name: "Lopez",
      initials: "OL",
      email: "olivia.lopez@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Peter",
      last_name: "Young",
      initials: "PY",
      email: "peter.young@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Quinn",
      last_name: "Hall",
      initials: "QH",
      email: "quinn.hall@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Ryan",
      last_name: "Allen",
      initials: "RA",
      email: "ryan.allen@example.com",
      status: "ACTIVE",
    },
    {
      first_name: "Sophia",
      last_name: "King",
      initials: "SK",
      email: "sophia.king@example.com",
      status: "ACTIVE",
    },
  ];

  const { count: insertedUsers } = await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true,
  });
  console.log(`Inserted ${insertedUsers} users`);

  const userIds = (await prisma.user.findMany({ select: { id: true } })).map(
    (u) => u.id
  );

  const addressesData = userIds.map((user_id) => ({
    user_id,
    address_type: "HOME",
    valid_from: new Date(),
    post_code: "123456",
    city: "Sample City",
    country_code: "USA",
    street: "Main Street",
    building_number: "10A",
  }));

  const { count: insertedAddresses } = await prisma.userAddress.createMany({
    data: addressesData,
    skipDuplicates: true,
  });
  console.log(`Inserted ${insertedAddresses} address records`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
