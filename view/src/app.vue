<template>
    <div class="app">
        <navbar />
        <transition :name="transitionName" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<style lang="css" src="./app.css" />
<script lang="ts" src="./app.ts" />
