export type ApiMessage = {
    id: string;
    object: string;
    created_at: number;
    assistant_id: string;
    thread_id: string;
    run_id: string;
    role: string;
    content: Array<{
        type: string;
        text: {
            value: string;
            annotations: any[];
        };
    }>;
    attachments: any[];
    metadata: Record<string, any>;
};

export type ApiResponse = {
    options: Record<string, any>;
    response: Record<string, any>;
    body: Record<string, any>;
    data: ApiMessage[];
}

export enum Role {
    user = "user",
    assistant = "assistant"
}

export enum MsgType {
    text = "text",
    image = "image"
}

export type UiMessage = {
    id: string;
    role: Role,
    msg: {
        type: MsgType,
        value: string
    }
}