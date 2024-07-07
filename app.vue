<template>
  <div class="w-screen relative px-4">
    <div
      class="fixed z-10 left-0 top-0 w-full h-[2px] bg-gradient-to-r from-primary-light via-accent to-primary-dark transition-all duration-300 ease-out"
      :class="[loading ? 'block animate-ping' : 'hidden']">
    </div>
    <header class="w-full flex pb-16 flex-col items-center sticky top-0 inset-x-0"
      :class="[isHeaderMinimized ? 'pt-6 pb-6' : 'pt-48']"
      style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
      <img src="/logo-black.png" :class="[isHeaderMinimized ? 'w-[75px] h-[75px]' : 'w-[150px] h-[150px]']" />
      <div class="w-full max-auto flex justify-center my-16 gap-4" v-if="!isHeaderMinimized">
        <p class="border rounded-xl w-64 h-32 shadow p-4 text-ellipsis overflow-hidden cursor-pointer"
          @click="handleExampleClick(exampleQueries[0])" :title="exampleQueries[0]">{{
          ellipsizeExample(exampleQueries[0]) }}</p>
        <p class="border rounded-xl w-64 h-32 shadow p-4 text-ellipsis overflow-hidden cursor-pointer"
          @click="handleExampleClick(exampleQueries[1])" :title="exampleQueries[1]">{{
          ellipsizeExample(exampleQueries[1]) }}</p>
        <p class="border rounded-xl w-64 h-32 shadow p-4 hidden md:block cursor-pointer"
          @click="handleExampleClick(exampleQueries[2])" :title="exampleQueries[2]">{{
          ellipsizeExample(exampleQueries[2]) }}</p>
      </div>
    </header>
    <main class="pb-32">
      <p class="text-center py-4 bg-accent fixed top-0 inset-x-0" v-if="error">Failed with error:{{ errorMsg }}</p>
      <ul class="flex flex-col gap-4 py-4 max-w-4xl mx-auto" v-else>
        <li v-for="msg in messages" class="flex gap-x-4 py-4" :key="msg.id">
          <div class="h-[32px] w-[32px]">
            <Icon name="mdi:account-circle-outline" size="32" v-if="msg.role === Role.user" />
            <img src="/logo-icon.png" width="32" height="32" v-else />
          </div>
          <p class="rounded-3xl bg-accent-light px-3 py-2 max-w-xl" v-if="msg.role === Role.user">{{ msg.msg.value }}
          </p>
          <div class="w-full text-wrap bg-secondary-light rounded-3xl px-3 pb-2" v-html="renderFormatted(msg.msg.value)"
            v-else>
          </div>
        </li>
      </ul>
      <div ref="bottom" key="bottom" class="mt-20">&nbsp;</div>
      <div
        class="bg-white shadow rounded-3xl max-w-[680px] h-[48px] flex items-center p-1 mx-4 fixed bottom-16 inset-x-0 shadow-lg md:mx-auto">
        <input type="text" name="query" id="query" placeholder="Message python-gpt"
          class="w-full px-3 outline-none md:px-6" :class="{ 'cursor-not-allowed': loading }" v-model="userInput"
          @focus="handleFocus" @keyup.enter="handleSubmit(null)" :disabled="loading">
        <button class="h-10 w-10 rounded-full bg-accent overflow-hidden"
          :class="[loading ? 'cursor-not-allowed opacity-20' : '']" @click="handleSubmit(null)" :disabled="loading">
          <Icon name="mdi:arrow-upward" size="28" />
        </button>
      </div>
      <strong class="fixed bottom-8 inset-x-0 text-center"
        style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">python-gpt
        may make mistakes.</strong>
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

const loading = ref(false);
const askChatGpt = async (question) => {
  try {
    loading.value = true;
    error.value = null;
    const { success, resp, status } = await $fetch('/api/assistant', {
      method: 'post',
      body: { myThread: myThread.value, msg: question ? question : userInput.value }
    });
    messages.value.push(...MessageAdapter.fromApiResponse(resp).reverse());
    nextTick(() => { // run after the DOM has been updated
      scrollToBottom();
    })
    error.value = !success;
    errorMsg.value = status;
  } catch(err) {
    console.log("🚀 ~ askChatGpt ~ err:", err);    
    error.value = true;
    errorMsg.value = err.message ?? "something went wrong";
    setTimeout(() => {
      error.value = false;
      errorMsg.value = "";
    }, 6000);
  } finally {
    loading.value = false;
    userInput.value = '';
  }
};

const handleFocus = () => {
  isHeaderMinimized.value = true;
};

const nuxtApp = useNuxtApp();
const renderFormatted = (content) => {
  return nuxtApp.$markdown.render(content);

};

const ellipsizeExample = (example) => {
  const numLetters = example.length;
  const CAP = 54;
  return numLetters > CAP + 1 ? example.slice(0, CAP).concat('...') : example.slice(0, CAP);
}

const bottom = ref('');
const scrollToBottom = () => {
  bottom.value.scrollIntoView({
    behavior: "smooth",
    // block: "end",
    // inline: "end",
  });
}

</script>
