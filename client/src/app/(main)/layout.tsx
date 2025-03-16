import NavigationBar from "@/components/navbar/NavigationBar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <NavigationBar />
      <div className="flex min-h-screen max-w-7xl flex-col items-center justify-center bg-white dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}
