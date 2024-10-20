// 'use client'
// import { useEffect } from "react";
// import { useRouter } from "next/router";

const SuccessPage = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const sessionId = router.query.session_id;

  //   // Optional: Fetch session details using the sessionId for confirmation
  //   const fetchSessionDetails = async () => {
  //     const response = await fetch(`/api/checkout_sessions/${sessionId}`);
  //     const session = await response.json();
  //     console.log(session); // Handle session details as needed
  //   };

  //   if (sessionId) {
  //     fetchSessionDetails();
  //   }
  // }, [router.query.session_id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg text-gray-600">
        Thank you for your purchase. Your order is being processed.
      </p>
      <a href="/" className="mt-6 inline-block px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-300">
        Go back to shop
      </a>
    </div>
  </div>
  );
};

export default SuccessPage;
