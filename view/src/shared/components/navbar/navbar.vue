<template>
    <div class="navbar">
        <h1 class="navbar-title">Shortened URL</h1>
        <div class="navbar-items">
            <router-link
                class="navbar-link"
                active-class="navbar-active-link"
                to="/home"
            >
                <al-button variation="link" size="lg">
                    {{ $t('navBar.generate') }}
                </al-button>
            </router-link>
            <router-link
                class="navbar-link"
                active-class="navbar-active-link"
                to="/history"
            >
                <al-button variation="link" size="lg">
                    {{ $t('navBar.history') }}
                </al-button>
            </router-link>
        </div>
    </div>
</template>
<style lang="css" src="./navbar.css" />
<script lang="ts" src="./navbar.ts" />
