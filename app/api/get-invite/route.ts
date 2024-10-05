import { REST } from "@discordjs/rest";
import { API } from "@discordjs/core/http-only";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

const cache: {
  timestamp: number;
  code: string;
} = {
  timestamp: 0,
  code: "",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const discordRest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN!,
  );
  const discordApi = new API(discordRest);
  const currentTimestamp = Date.now();

  console.log("Cache Timestamp", cache.timestamp, "\nCurrent Timestamp", currentTimestamp);

  if (currentTimestamp - cache.timestamp > 5 * 60 * 1000) {
    console.log("Generating new invite");
    const invite = await discordApi.channels.createInvite(
      process.env.CHANNEL_ID!,
      {
        max_age: 10 * 60,
        unique: true,
      },
    );
    cache.timestamp = currentTimestamp;
    cache.code = invite.code;
  }

  return NextResponse.json({
    invite: cache.code,
  });
}
