import { defineNuxtPlugin } from "#app";
//@tsignore
import MarkdownIt from "markdown-it";
import hljs from "highlight.js"

export default defineNuxtPlugin(() => {
    const md = new MarkdownIt({
        highlight: function (str: string, lang: string) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return (
                        '<pre class="bg-gray-800 text-white px-3 py-2 rounded-lg my-2"><code class="hljs">' +
                        hljs.highlight(str, {
                            language: lang,
                            ignoreIllegals: true,
                        }).value +
                        "</code></pre>"
                    );
                } catch (__) {}
            }

            return (
                '<pre class="bg-gray-800 text-white px-3 py-2 rounded-lg my-2"><code class="hljs">' +
                md.utils.escapeHtml(str) +
                "</code></pre>"
            );
        },
    });

    return {
        provide: {
            markdown: md,
        },
    };
});
