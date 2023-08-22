<template>
<div id="app">
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <router-link to="/" class="nav-link active" aria-current="page">HealtChain</router-link>
            </li>
            <li class="nav-item">
            <router-link to="/camiones" class="nav-link">Login</router-link>
            </li>
        </ul>
    </nav>
    <router-view/>
</div>
</template>

<script>
</script>
<style>
</style>
