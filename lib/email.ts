import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendCharacterEmail(
  to: string,
  characterName: string,
  ipTitle: string,
  appUrl: string
) {
  if (!resend) {
    console.log(`[email] Skipping email (no RESEND_API_KEY). Would have sent to ${to}: ${characterName} from ${ipTitle}`);
    return;
  }
  try {
    await resend.emails.send({
      from: 'Character Guesser <noreply@characterguesser.app>',
      to,
      subject: "Here's your partner's character! 🎭",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h1 style="font-size: 24px;">🎭 Your partner's character is...</h1>
          <div style="background: #1a1a1a; color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 20px 0;">
            <div style="font-size: 36px; font-weight: bold; margin-bottom: 8px;">${characterName}</div>
            <div style="color: #888; font-size: 16px;">from ${ipTitle}</div>
          </div>
          <p>Now you know what to put on their forehead. Don't tell them! 🤫</p>
          <p><a href="${appUrl}">Play again</a></p>
        </div>
      `,
    });
  } catch (err) {
    console.error('[email] Failed to send:', err);
  }
}
