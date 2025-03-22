import getAuth from "@/lib/auth/getAuth";
import { redirect } from "next/navigation";

const DashoardPage = async () => {
  const session = await getAuth();
  if (!session) {
    redirect("/auth/login?redirect=/dashboard");
  }

  return (
    <main>
      <h1>Dashboard Page</h1>
      <p>ID : {session?.user.id}</p>
      <p>Email : {session?.user.email}</p>
      <p>Role : {session?.user.role}</p>
    </main>
  );
};

export default DashoardPage;
