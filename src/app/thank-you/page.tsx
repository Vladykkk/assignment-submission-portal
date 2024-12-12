const ThankYouPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-[#272B2A]">Thank you!</h1>
      <p className="mb-6 max-w-md text-lg text-gray-600">
        We have received your submission and will review it shortly.
      </p>
      <div className="rounded-lg bg-[#F3FAF8] p-6">
        <p className="mb-2 text-[#469C8F]">What happens next?</p>
        <p className="text-sm text-gray-600">
          Our team will review your submission and contact you via email with
          further instructions.
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
