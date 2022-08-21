import { ValidWorkerFunctionsType } from '../workers/types';

/**
 * This will call worker, You will get response as a callback
 */
const CallWorker = <Input, Output>(
  FUNCTION: ValidWorkerFunctionsType,
  INPUT: Input,
  RESPONSE: (RESPONSE: Output) => void
) => {
  const Workerr = new Worker(new URL('../workers/worker.ts', import.meta.url));

  Workerr.addEventListener('message', (EVENT: MessageEvent<Output>) => {
    RESPONSE(EVENT.data);
    Workerr.terminate();
  });

  Workerr.postMessage({ Function: FUNCTION, Input: INPUT });

  return () => Workerr.terminate();
};

export default CallWorker;
