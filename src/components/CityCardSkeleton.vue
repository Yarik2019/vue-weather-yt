<template>
    <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md">
        <div class="flex flex-col flex-1 grap-2">
            <AnimatedPlaceholder class="max-w-[50%]"/>
            <AnimatedPlaceholder class="max-w-[40%]"/>
        </div>
        <div class="flex flex-col  items-end flex-1 grap-2">
            <AnimatedPlaceholder class="max-w-[50%] w-full"/>
            <AnimatedPlaceholder class="max-w-[40%] w-full"/>
        </div>
    </div>
</template>
<script>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
export default {
   components:{
    AnimatedPlaceholder
   }
}
</script>