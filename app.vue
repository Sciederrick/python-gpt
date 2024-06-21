<template>
  <div class="w-screen h-screen bg-secondary-light relative px-4">
    <header class="w-full flex pb-16 flex-col items-center" :class="[isHeaderMinimized ? 'pt-6 pb-6' : 'pt-48']">
      <img src="/logo-black.png" :class="[isHeaderMinimized ? 'w-[75px] h-[75px]' : 'w-[150px] h-[150px]']" />
      <div class="w-full max-auto flex justify-center my-16 gap-4" v-if="!isHeaderMinimized">
        <p class="border rounded-xl w-64 h-32 shadow p-4 text-ellipsis overflow-hidden cursor-pointer"
          @click="handleExampleClick(exampleQueries[0])">{{ exampleQueries[0] }}</p>
        <p class="border rounded-xl w-64 h-32 shadow p-4 text-ellipsis overflow-hidden cursor-pointer"
          @click="handleExampleClick(exampleQueries[1])">{{ exampleQueries[1] }}</p>
        <p class="border rounded-xl w-64 h-32 shadow p-4 hidden md:block cursor-pointer"
          @click="handleExampleClick(exampleQueries[2])">{{ exampleQueries[2] }}</p>
      </div>
    </header>
    <main>
      <p class="w-full text-center py-4 bg-accent" v-if="error">{{ status }}</p>
      <ul class="flex flex-col gap-4 py-4 max-w-4xl mx-auto" v-else>
        <li v-for="msg in messages" class="flex gap-x-4 py-4">
          <div class="h-[32px] w-[32px]">
            <Icon name="mdi:account-circle-outline" size="32" v-if="msg.role === Role.user" />
            <img src="/logo-icon.png" width="32" height="32" v-else />
          </div>
          <p class="rounded-3xl bg-accent-light py-3 px-6" v-if="msg.role === Role.user">{{ msg.msg.value }}</p>
          <pre class="w-full text-wrap bg-secondary-light rounded-3xl py-3 px-6" v-else>
            {{ msg.msg.value }}
          </pre>
        </li>
      </ul>
      <div
        class="bg-white shadow rounded-3xl max-w-[680px] h-[48px] flex items-center p-1 mx-4 absolute bottom-16 inset-x-0 shadow-lg md:mx-auto">
        <input type="text" name="query" id="query" placeholder="Message python-gpt" class="w-full pl-6 outline-none"
          v-model="userInput" @focus="handleFocus">
        <button class="h-10 w-10 rounded-full bg-accent overflow-hidden" @click="handleSubmit(null)">
          <Icon name="mdi:arrow-upward" size="28" />
        </button>
      </div>
      <strong class="absolute bottom-8 inset-x-0 text-center">python-gpt may make mistakes.</strong>
    </main>
  </div>
</template>

<script setup>
import { MessageAdapter } from './adapters/MessageAdapter';
import { Role } from './types';

const myThread = ref(null);
onMounted(async () => {
  const thread = await $fetch('/api/thread');
  myThread.value = thread;
});

const exampleQueries = [
  'How do I manage dependencies and virtual environments in Python?',
  'How can I optimize the performance of my Python code?',
  'What are the best practices for writing unit tests in Python?'
];
const userInput = ref('');
const isHeaderMinimized = ref(false);

const messages = ref([]);
const error = ref(null);
const errorMsg = ref(null);

const handleExampleClick = (question) => {
  isHeaderMinimized.value = true;
  askChatGpt(question);
};

const handleSubmit = () => {
  askChatGpt(null);
};

const askChatGpt = async (question) => {
  error.value = null;
  const { success, resp, status } = await $fetch('/api/assistant', {
    method: 'post',
    body: { myThread: myThread.value, msg: question ? question : userInput.value }
  });
  messages.value.push(...MessageAdapter.fromApiResponse(resp).reverse());
  error.value = !success;
  errorMsg.value = status;
}

const handleFocus = () => {
  isHeaderMinimized.value = true;
}

</script>
