import { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren<any>) => {
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
