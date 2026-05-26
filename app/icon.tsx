import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  try {
    const imagePath = join(process.cwd(), "public/images/shadai-logo.png");
    const imageData = readFileSync(imagePath);
    return new Response(imageData, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch {
    // Fallback to dynamic icon if image not found
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0f4c75, #1b6ca8)",
            color: "white",
            fontSize: 18,
            fontWeight: 700,
            fontFamily: "Arial, sans-serif",
          }}
        >
          SJ
        </div>
      ),
      {
        ...size,
      },
    );
  }
}
