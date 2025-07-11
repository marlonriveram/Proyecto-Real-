import { type AppType } from "next/dist/shared/lib/utils";
import { Provider } from "~/components/ui/provider";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import "~/styles/globals.css";


const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
};

export default MyApp;

