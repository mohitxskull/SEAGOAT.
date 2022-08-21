import { showNotification } from '@mantine/notifications';
import SessionStorage from '../lib/helpers/functions/sessionStorageFuns';

const NotiMain = (
  msg: string | null,
  event: 'Error' | 'Done' | 'Info' | 'Critical'
) => {
  showNotification({
    styles: () => ({
      root: {
        backgroundColor: '#121212',
        borderColor: '#121212',
      },
    }),
    disallowClose: true,
    autoClose: 5000,
    title: `${event}!`,
    message:
      event === 'Critical' && !msg
        ? "This Error should't come, Report to Dev"
        : msg,
  });
  SessionStorage.Set('Noti', { Msg: msg, Expiry: Date.now() + 5000 });
};

export default function Noti(
  msg: string | null,
  event: 'Error' | 'Done' | 'Info' | 'Critical'
) {
  NotiMain(msg, event);
  // const LastMsgObj: { Msg: string; Expiry: number } =
  //   SessionStorage.Get('Noti');

  // if (LastMsgObj) {
  //   if (LastMsgObj.Msg === msg && LastMsgObj.Expiry < Date.now()) {
  //     console.log(
  //       'Same!',
  //       LastMsgObj.Expiry < Date.now(),
  //       LastMsgObj.Expiry,
  //       Date.now()
  //     );
  //   } else {
  //     NotiMain(msg, event);
  //   }
  // } else {
  //   NotiMain(msg, event);
  // }
}
