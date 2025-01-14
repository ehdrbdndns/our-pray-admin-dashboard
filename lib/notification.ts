import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';


// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  /*
   * @deprecated
   * The optional useFcmV1 parameter defaults to true, as FCMv1 is now the default for the Expo push service.
   *
   * If using FCMv1, the useFcmV1 parameter may be omitted.
   * Set this to false to have Expo send to the legacy endpoint.
   *
   * See https://firebase.google.com/support/faq#deprecated-api-shutdown
   * for important information on the legacy endpoint shutdown.
   *
   * Once the legacy service is fully shut down, the parameter will be removed in a future PR.
   */
  useFcmV1: true,
});

async function pushNotification({
  pushTokens,
  sound,
  data,
  title,
  subtitle,
  body,
  badge
}: {
  pushTokens: string[],
  sound: string,
  data: Record<string, unknown>,
  title: string,
  subtitle: string,
  body: string,
  badge: number,
}) {

  let messages: ExpoPushMessage[] = [];
  for (let pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound,
      data,
      body,
      badge,
      title,
      subtitle,
    });
  }

  let chunks = expo.chunkPushNotifications(messages);

  let tickets: ExpoPushTicket[] = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();

  // Set a timeout to handle tickets after 1 hour
  setTimeout(async () => {
    let receiptIds = [];
    for (let ticket of tickets) {
      if (ticket.status === 'ok') {
        receiptIds.push(ticket.id);
      }
    }

    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);

        for (let receiptId in receipts) {
          let { status, details } = receipts[receiptId];
          if (status === 'ok') {
            continue;
          } else if (status === 'error') {
            console.error(`There was an error sending a notification: ${JSON.stringify(details)}`);
            if (details && 'error' in details) {
              console.error(`The error code is ${details.error}`);

              switch (details.error) {
                case "DeviceNotRegistered":
                  // todo change user alarm status
                  break;
                default:
                  break;
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, 60 * 60 * 1000); // 1 hour in milliseconds
}
export { pushNotification };