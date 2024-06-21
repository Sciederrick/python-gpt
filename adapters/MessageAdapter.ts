import type { ApiMessage, ApiResponse, MsgType, Role, UiMessage } from "~/types";

export class MessageAdapter {
    public static fromApiResponse(apiResponse: ApiResponse): UiMessage[] {
        return apiResponse.data.map(MessageAdapter.fromApiMessage);
    }

    private static fromApiMessage(apiMessage: ApiMessage): UiMessage {
        return {
            id: apiMessage.id,
            role: apiMessage.role as Role,
            msg:{ type: apiMessage.content[0].type as MsgType, value: apiMessage.content[0].text.value }
        }
    }
}