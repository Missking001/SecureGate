import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to dashboard (middleware will bounce to login if unauthenticated)
  redirect("/dashboard");
}
