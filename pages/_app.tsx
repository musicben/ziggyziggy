import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react";
import { PrivyProvider } from '@privy-io/react-auth';
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { configureChains } from 'wagmi';
import { goerli, mainnet, polygon, polygonMumbai, arbitrum, arbitrumGoerli, optimism, optimismGoerli } from "wagmi/chains";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const configureChainsConfig = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    goerli,
    polygonMumbai,
    optimismGoerli,
    arbitrumGoerli,
  ],
  [
    alchemyProvider({
      apiKey: '0jEGdrOL9bPX8YEcylQIuYm6cgObvmHo',
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
    // jsonRpcProvider({
    //   rpc: (chain) => {
    //     if (customChainIds.indexOf(chain.id) <= 0) return null
    //     return { http: chain.rpcUrls.default }
    //   },
    // }),
  ]
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrivyProvider  appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}>
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
      <ToastContainer />
      <Analytics />
      <Navbar />
      <Component {...pageProps} />
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}

export default MyApp;
