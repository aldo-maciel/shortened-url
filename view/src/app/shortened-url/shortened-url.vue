<template>
    <div class="layout shortened-url">
        <h2>{{ $t('shortenedUrl.title') }}</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>{{ $t('shortenedUrl.createdAt') }}</th>
                    <th>{{ $t('shortenedUrl.short') }}</th>
                    <th>{{ $t('shortenedUrl.original') }}</th>
                </tr>
            </thead>
            <tbody v-if="rows.length === 0">
                <tr>
                    <td class="text-center" colspan="3">
                        {{ $t('general.noResults') }}
                    </td>
                </tr>
            </tbody>
            <tbody v-if="rows.length > 0">
                <tr v-for="row in rows" :key="row._id">
                    <td>{{ $d(new Date(), 'long') }}</td>
                    <td>
                        <a :href="row.originalUrl" target="_blank">{{ row.shortUrl }}</a>
                    </td>
                    <td>
                        <a :href="row.originalUrl" target="_blank">{{ row.originalUrl }}</a>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">
                        <paginate :totalRecords="counter" :onChange="callServer"></paginate>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>
<style lang="css" src="./shortened-url.css" />
<script lang="ts" src="./shortened-url.controller.ts" />
