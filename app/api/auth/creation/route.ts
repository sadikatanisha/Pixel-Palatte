import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../../../utils/db";
import { NextResponse } from "next/server";
import { stripe } from "@/app/utils/stripe";
export async function GET() {
  try {
    console.log("Initializing Kinde session...");
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log("User retrieved:", user);

    if (!user || user == null || !user.id) {
      throw new Error("User information is missing...");
    }

    console.log("Checking user in database...");
    let dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      const account = await stripe.accounts.create({
        email: user.email as string,
        controller: {
          losses: {
            payments: "application",
          },
          fees: {
            payer: "application",
          },
          stripe_dashboard: {
            type: "express",
          },
        },
      });
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
          profileImage:
            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
          connectedAccountId: account.id,
        },
      });
    }

    console.log("User found/created:", dbUser);
    return NextResponse.redirect("http://localhost:3000");
  } catch (error) {
    console.error("Error in API route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
