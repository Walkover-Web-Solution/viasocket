import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
export default function ReCaptchaProvider({ children }) {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
            {children}
        </GoogleReCaptchaProvider>
    );
}
