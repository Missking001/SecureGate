export function AlertBanner({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  const isError = type === "error";

  return (
    <div
      className={`rounded-md border p-4 ${
        isError ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"
      }`}
    >
      <div className="flex">
        <div className="ml-3">
          <p
            className={`text-sm font-medium ${
              isError ? "text-red-800" : "text-green-800"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
