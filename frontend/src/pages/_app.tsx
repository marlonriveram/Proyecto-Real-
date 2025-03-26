import { type AppType } from "next/dist/shared/lib/utils";
import { Provider } from "~/components/ui/provider";
import "~/styles/globals.css";


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;

