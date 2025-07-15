import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { getApiUrl } from "../utils/api";

const AdminLogin: React.FC = () => {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpExpires, setOtpExpires] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const navigate = useNavigate();

  // Countdown timer for OTP expiry
  useEffect(() => {
    if (otpExpires && step === "verify") {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const expiry = new Date(otpExpires).getTime();
        const difference = expiry - now;

        if (difference > 0) {
          setTimeLeft(Math.floor(difference / 1000));
        } else {
          setTimeLeft(0);
          toast.error("OTP has expired. Please request a new one.");
          setStep("request");
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [otpExpires, step]);

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(getApiUrl("/api/auth/request-otp"));

      if (response.data.message) {
        toast.success("OTP sent to admin email!");
        setOtpExpires(new Date(response.data.otpExpires));
        setStep("verify");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(getApiUrl("/api/auth/verify-otp"), {
        otp,
      });

      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Login successful!");
        navigate("/admin");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === "request"
            ? "Click below to receive an OTP"
            : "Enter the OTP sent to chhikaraconstructions@gmail.com"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Step 1: Request OTP */}
          {step === "request" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <svg
                    className="w-12 h-12 text-blue-600 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 7.89a3 3 0 004.24 0L21 9M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Secure Admin Access
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Click below to receive a secure OTP at
                    <br />
                    <span className="font-medium">
                      chhikaraconstructions@gmail.com
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={handleRequestOTP}
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP to Admin Email"
                )}
              </button>
            </div>
          )}

          {/* Step 2: OTP Input */}
          {step === "verify" && (
            <form className="space-y-6" onSubmit={handleVerifyOTP}>
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter 6-Digit OTP
                </label>
                <div className="mt-1">
                  <input
                    id="otp"
                    type="text"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center text-2xl tracking-widest"
                    placeholder="000000"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  OTP sent to:{" "}
                  <span className="font-medium">
                    chhikaraconstructions@gmail.com
                  </span>
                </p>
                {timeLeft > 0 && (
                  <p className="mt-1 text-sm text-blue-600">
                    Time remaining:{" "}
                    <span className="font-mono">{formatTime(timeLeft)}</span>
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading || timeLeft === 0}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Login"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("request");
                    setOtp("");
                    setOtpExpires(null);
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back to Email
                </button>
              </div>
            </form>
          )}

          {/* Security Notice */}
          <div className="mt-6">
            <div className="text-center text-xs text-gray-500">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-green-600 font-medium">
                  Secure OTP Authentication
                </span>
              </div>
              <p>OTP expires in 10 minutes • Rate limited for security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
