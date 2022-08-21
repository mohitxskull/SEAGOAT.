import { useNetwork } from '@mantine/hooks';

const useOnline = () => {
  const NetworkStatus = useNetwork();

  return { Online: NetworkStatus.online };
};

export default useOnline;
