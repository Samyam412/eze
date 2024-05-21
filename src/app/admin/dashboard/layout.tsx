import Container from "~/components/container";
import SideNavbar from "./_components/side-navbar";
import { checkRole } from "~/lib/role";
import { FormError } from "~/components/form/form-error";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  if (!checkRole("admin")) {
    return (
      <div className="flex items-center justify-center">
        <FormError message="You are not authorized to view this page" />
      </div>
    );
  }

  return (
    <Container>
      <SideNavbar />
      {children}
    </Container>
  );
};

export default AdminLayout;
