import { getIsAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminClient from "./admin-client";

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <AdminClient />;
};

export default AdminPage;