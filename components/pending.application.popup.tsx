import type { FC } from "react";

type PendingApplicationPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PendingApplicationPopup: FC<PendingApplicationPopupProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pending-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-amber-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="size-8 text-amber-600"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </div>

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-green-700">
          SHSWO Member Portal
        </p>

        <h2
          id="pending-title"
          className="text-2xl font-bold text-neutral-900"
        >
          Application Submitted!
        </h2>

        <p className="mt-3 text-sm leading-6 text-neutral-600">
          Your membership application has been submitted successfully.
          It is now awaiting admin verification.
        </p>

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-semibold text-amber-800">
            Status: Pending Verification
          </p>
          <p className="mt-1 text-xs leading-5 text-amber-700">
            Please wait while the administration reviews your application.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-green-800 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-900"
        >
          Close & Continue
        </button>
      </div>
    </div>
  );
};

export default PendingApplicationPopup;