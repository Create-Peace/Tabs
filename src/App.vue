<template>
    <div class="app">

        <Tabs style="width: 200px">
            <Tabpane label="tab1" name='tab1'><div>tab1 内容</div></Tabpane>
            <Tabpane label="tab2" name='tab2'><div>tab2 内容</div></Tabpane>
            <Tabpane label="tab3" name='tab3'><div>tab3 内容</div></Tabpane>
        </Tabs>
    </div>
</template>
<script>
import Tabs from './Tabs'
import Tabpane from './TabPane.vue'
export default {
    name: 'App',
    components: {
        Tabs,
        Tabpane
    }
}
</script>