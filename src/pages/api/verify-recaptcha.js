import { NextResponse } from 'next/server';

export default async function (req, res) {
    const body = req.body;
    const { token } = body;
    const secretKey = process.env.SERVER_RECAPTCHA_KEY;
    const verificationToken = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
        { method: 'POST' }
    );
    const verification = await verificationToken.json();
    if (verification.success) {
        res.status(200).json({
            success: true,
            score: verification.score,
        });
    } else {
        res.status(400).json({
            error: verification.error,
            score: verification.score,
            success: false,
        });
    }
}

export const runtime = 'experimental-edge';