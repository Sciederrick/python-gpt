import OpenAI from 'openai';

export default defineEventHandler(async (_) => {
    try {
        const { apiKey } = useRuntimeConfig().privateRuntimeConfig;
    
        const openai = new OpenAI({
            apiKey
        });

        const filesForCodeInterpreter = {
            "pandas-docs-pdf": "file-MiuCFqa2gWLod2z9eJMR6yrj",
            "python-for-data-analysis-by-wes-mckinney":
                "file-JOCHbSpWZLAS5QlZ1gj9ydYZ",
            "python-docs-pdf": "file-JUYMVTasOq7Bx7iUuwJa4Hi3",
            "numpy-docs-pdf": "file-PvYCJaqMB6FVNPUmjXtdXmHt",
        };

        return await openai.beta.threads.create({
            body: {
                tool_resources: {
                    code_interpreter: {
                        file_ids: Object.values(filesForCodeInterpreter),
                    },
                    file_search: {
                        vector_store_ids: ["vs_jDpKK0amnFTqcJDSqs9xSzI8"],
                    },
                },
            },
        });
    } catch(err:any) {
        return null;
    }
});