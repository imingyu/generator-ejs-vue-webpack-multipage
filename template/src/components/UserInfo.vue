<template>
    <div class="user-info">
        <ul>
            <li><img src="../img/avt.jpg" alt=""></li>
            <li>name:{{name}}</li>
            <li>email:{{email}}</li>
            <li>github:{{github}}</li>
        </ul>
    </div>
</template>

<style>
.user-info ul{
    padding-left: 30px;
}
</style>

<script>
    export default {
        name: 'UserInfo',
        data: function () {
            return {
                name: '小明爱吃瓜',
                email: 'mingyuhisoft@163.com',
                github: 'https://github.com/imingyu'
            }
        }
    }
</script>