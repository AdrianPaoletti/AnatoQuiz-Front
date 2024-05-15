import { ReactQueryProvider } from "../providers/react-query/ReactQueryProvider";
import { Layout } from "../styles/objects/Layout";

import "@anatoquiz/styles/index.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Layout>{children}</Layout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
