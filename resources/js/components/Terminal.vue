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

            <section id="terminal_body">

                <div v-for="(msg, index) in messages" :key="index">
                    <TerminalMessage :message="msg.message" :sender="msg.sender" />
                </div>

                <div class="terminal__message">
                    <span class="user_msg">{{ user }}:</span>
                    <span class="user_loc">~</span><span class="user_doll">$</span>
                    <input @keyup.enter="createEvent" class="terminal_input">
                </div>

            </section>

        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TerminalMessage from './TerminalMessage.vue'

const user = 'martvdzalm@root';
const messages = ref([]);

function createEvent(event)
{
    if (event.target.value === "clear") {
        clearTerminal();
    } else {
        addMessage(event);
    }

    event.target.value = '';
}

function clearTerminal()
{
    messages.value = [];
}

function addMessage(event)
{
    messages.value.push({ message: event.target.value, sender: user });
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono');
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

body {
    background: linear-gradient(45deg, #57003f 0%,#f57453 100%);
    font-family: 'Ubuntu';
    margin: 0;
}

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
    box-shadow: 2px 4px 10px rgba(0,0,0,.5);
    position: absolute;
    border-radius: 10px 10px 0px 0px;
}

.terminal_nav {
    background: linear-gradient(#504b45 0%,#3c3b37 100%);
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
    font-family: 'Ubuntu mono';
    font-size: 18px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
}

.terminal_input {
    background-color: transparent;
    border: none;
    color: white;
    padding: 0 5px;
    font-family: inherit;
    font-size: inherit;
}

.terminal_input:focus{
    outline: none;
}

.terminal__message {
    margin-left: 5px;
}

.terminal__text {
    color: #ddd;
    padding: 1px 5px;
}

.user_msg {
    color: #87d441;
}

.user_loc {
    color: #6d85a9;
}

.user_doll {
    color: #ddd;
}

</style>