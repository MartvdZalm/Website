<template>
    <div class="terminal_wrapper">
        <section id="terminal">

            <nav class="terminal_nav">
                <div class="terminal_nav__btns">
                    <button class="terminal_nav__btn t-exit">&#10005;</button>
                    <button class="terminal_nav__btn">&#9723;</button>
                    <button class="terminal_nav__btn">&#9472;</button>
                </div>
                <p class="terminal_nav__title">Terminal</p>
            </nav>

            <section id="terminal_body" @click="focusInput">
                <div class="terminal__message" v-for="(msg, index) in messages" :key="index">
                    <TerminalMessage :message="msg.message" :sender="msg.sender" />
                </div>

                <div class="terminal__message">
                    <TerminalMessage :sender="user"/>
                    <input @keyup.enter="createEvent" ref="terminal_input" class="terminal_input">
                </div>
            </section>

        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import TerminalMessage from './TerminalMessage.vue';

const router = useRouter();
const user = 'martvdzalm@root';
const terminal_input = ref();
const messages = ref([]);
const commands = ['about', 'clear', 'commands'];

onMounted(() => {
    focusInput();
})

function createEvent(event)
{
    let input = event.target.value;

    if (commands.indexOf(input) != -1) {

        switch (input) {

            case 'clear': {
                messages.value = [];
            } break;

            case 'commands': {
                let text = '';

                for (let i = 0; i < commands.length; i++) {
                    text += commands[i] + ' ';
                }
                messages.value.push({ message: text, sender: user });
            } break;

            case 'about': {
                router.push('/about');
            } break;
        }

    } else {
        messages.value.push({ message: input, sender: user }); 
    }

    event.target.value = '';
}

function focusInput()
{
    terminal_input.value.focus();
}

</script>

<style scoped>

.terminal_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}

#terminal {
    width: 60em;
    height: 35em;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, .5);
    position: absolute;
    border-radius: 10px 10px 0px 0px;
}

.terminal_nav {
    background: linear-gradient(#504b45 0%, #3c3b37 100%);
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    height: 25px;
    display: flex;
    align-items: center;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

.terminal_nav__btns {
    display: flex;
    align-items: center;
}

.terminal_nav__btn {
    width: 12px;
    height: 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    padding: 0;
    font-size: 7px;
    background: linear-gradient(#7d7871 0%, #595953 100%);
    text-shadow: 0px 1px 0px rgba(255,255,255,0.2);
    box-shadow: 0px 0px 1px 0px #41403A,0px 1px 1px 0px #474642;
    border: none;
    margin-right: 4px;

}

.terminal_nav__btn:hover {
    cursor: pointer;
}

.t-exit {
    background: #f25d2b;
    background: linear-gradient(#f37458 0%, #de4c12 100%);
    background-clip: padding-box;
}

.terminal_nav__btn:focus {
    outline: none;
}

.terminal_nav__title {
    color: #d5d0ce;
    display: block;
    width: 85%;
    text-align: center;
    font-size: 12px;
}

#terminal_body {
    background: rgba(56, 4, 40, .9);
    height: calc(100% - 25px);
    padding-top: 2px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    overflow-y: auto;
    overflow-x: hidden;
}

.terminal__message {
    display: flex;
    width: 100%;
}

.terminal_input {
    flex: 1;
    background-color: transparent;
    border: none;
    color: white;
    font-family: inherit;
    font-size: inherit;
}

.terminal_input:focus{
    outline: none;
}

</style>