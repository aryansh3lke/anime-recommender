"use client";

export default function SignInCard({ error }: { error?: string }) {
  const getErrorMessage = (errorCode?: string) => {
    if (!errorCode) return null;

    switch (errorCode) {
      case "OAuthAccountNotLinked":
        return "Email already exists with different provider. Please sign in with the original provider.";
      default:
        return "An error occurred during sign in.";
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/50 dark:text-red-400">
          {getErrorMessage(error)}
        </div>
      )}
      {/* Rest of your sign in card content */}
    </div>
  );
}
