import { REST } from "@discordjs/rest";
import { API } from "@discordjs/core/http-only";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const discordRest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN!,
  );

  const discordApi = new API(discordRest);

  const invite = await discordApi.channels.createInvite(
    process.env.CHANNEL_ID!,
    {
      max_uses: 1,
      max_age: 5 * 60,
      unique: true,
    },
  );

  return NextResponse.json({
    invite: invite.code,
  });
}
