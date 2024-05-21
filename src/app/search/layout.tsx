import Container from "~/components/container";

interface SearchLayoutProps {
  children: React.ReactNode;
}

const SearchLayout = ({ children }: SearchLayoutProps) => {
  return (
    <Container customClass="h-[80vh]">
      <div className="flex flex-col">{children}</div>
    </Container>
  );
};

export default SearchLayout;
