import OpenAI from "openai";

export default defineEventHandler(async (event) => {
    try {
        const { apiKey } = useRuntimeConfig().privateRuntimeConfig;
        const { myThread, msg } = await readBody(event);

        const openai = new OpenAI({
            apiKey,
        });

        const thread = myThread ? myThread : await openai.beta.threads.create();
        console.log("🚀 ~ defineEventHandler ~ thread:", thread)        
        
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: msg,
        });

        const assistant_id = "asst_UbjFmsqvYBbkrHYaxd1I4xcN";
        let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: assistant_id,
            model: "gpt-3.5-turbo",
            // instructions: 'DON'T OVERRIDE INSTRUCTIONS I CREATED VIA THE WEB INTERFACE'
        });

        if (run.status === "completed") {
            const messages = await openai.beta.threads.messages.list(
                run.thread_id
            );
            console.log("🚀 ~ defineEventHandler ~ messages:", messages)
            // for (const message of messages.data.reverse()) {
            //     console.log(`${message.role} > ${message.content[0]}`);
            //     return { success: true, resp: message, status: "completed" };
            // }
            return { success: true, resp: messages, status: "completed" };
        } else {
            console.log(run.status);
            throw Error(`failed with status: ${run.status}`);
        }
    } catch (err: any) {
        return {
            success: false,
            resp: err.message,
            status: err?.message?.split(":") ?? "error" 
        };
    }
});
