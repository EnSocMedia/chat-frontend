import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMessagesUsingUserId } from "@/store/message/actions";
import { useEffect } from "react";

export const useGetMessagesUsingUserId = (userId: string) => {
  const messages = useAppSelector((state) => state.websocket.chatMessages);
  const isFetchingMoreMessages = useAppSelector(
    (state) => state.websocket.isFetchingChats
  );
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const userMessages = messages[userId];

  //   //If if there is already message stored in state
  //   //If not fetch with 50 limit
  //   if (!userMessages) {
  //     dispatch(getMessagesUsingUserId({ userId: userId, limit: 50 }));
  //   } else if (userMessages && userMessages.messages.length == 0) {
  //     dispatch(getMessagesUsingUserId({ userId: userId, limit: 50 }));
  //   } else {
  //     //TODO:
  //     //Fetch More messages on Scroll by sending last message Id
  //     dispatch(
  //       getMessagesUsingUserId({
  //         userId: userId,
  //         limit: 50,
  //         before: userMessages.lastMessageId,
  //       })
  //     );
  //   }
  // }, [dispatch, userId]);

  return {
    isFetching: isFetchingMoreMessages[userId]
      ? isFetchingMoreMessages[userId].isFecthing
      : false,
  };
};
