<template>
    <form @submit.prevent="generate">
        <div class="layout home">
            <h2 class="text-center">{{ $t('home.title') }}</h2>
            <div class="row">
                <div class="column grow-3">
                    <al-input
                        data-original-url
                        :label="$t('home.typeUrl')"
                        v-model="originalUrl"
                        :pattern="urlPattern"
                        :error-message="$t('home.invalidaUrl')"
                        required
                    />
                    <al-button variation="primary" type="submit">{{ $t('home.generate') }}</al-button>
                </div>
            </div>
            <div class="row generated" v-if="record.shortUrl">
                <div class="column grow-2">
                    <a :href="record.originalUrl" target="_blank">{{ record.originalUrl }}</a>
                </div>
                <div class="column grow-2">
                    <a :href="record.originalUrl" target="_blank">{{ record.shortUrl }}</a>
                </div>
                <div class="column grow-1 flex-end">
                    <al-button variation="secondary" @click="copy" type="button">{{ $t('general.copy') }}</al-button>
                </div>
            </div>
        </div>
    </form>
</template>
<style lang="css" src="./home.css" scoped />
<script lang="ts" src="./home.ts" />
