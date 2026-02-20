import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Shell({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-[var(--color-background)]">
          {children}
        </main>
      </div>
    </div>
  );
}
