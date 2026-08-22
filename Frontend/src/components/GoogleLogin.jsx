import { useEffect, useRef } from "react";

export default function GoogleLogin({ onSuccess }) {
  const googleButtonRef = useRef(null);

  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google || !googleButtonRef.current) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: "filled_black",
          size: "large",
          width: 380,
          text: "continue_with",
          shape: "pill"
        }
      );
    };

    if (window.google) {
      initializeGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
          initializeGoogle();
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  async function handleGoogleResponse(response) {
    try {
      console.log("Google credential received");

      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4400";
      const res = await fetch(`${backendUrl}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          credential: response.credential,
        }),
      });

      const data = await res.json();
      console.log("Google login response:", data);
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  }

  return (
    <div className="w-full flex justify-center py-2">
      <div ref={googleButtonRef} className="w-full flex justify-center"></div>
    </div>
  );
}