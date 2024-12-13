import { Suspense } from "react";

import ThankYouContent from "@/components/thank-you/ThankYouContent";

const ThankYouPage = () => {
  return (
    <Suspense fallback={<div>Loading submission details...</div>}>
      <ThankYouContent />
    </Suspense>
  );
};

export default ThankYouPage;
