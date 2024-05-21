type ContainerProps = {
  children: React.ReactNode;
  customClass?: string;
};

const Container: React.FC<ContainerProps> = ({ children, customClass }) => {
  return (
    <div
      className={`
      mx-auto
      max-w-[1920px]
      px-4
      md:px-2
      xl:px-20
      ${customClass ? customClass : ""}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
