<template>
    <div>
        <Header></Header>

        <el-row class="tac settings">
            <el-col :span="4">
                <el-menu @select="menuSelected"
                         :default-active="actived">
                    <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
                        {{ item.navItem }}
                    </el-menu-item>
                </el-menu>
            </el-col>

            <el-col :span="20">
                <keep-alive>
                    <component :is="currentComponent"></component>
                </keep-alive>
            </el-col>

        </el-row>

    </div>
</template>


<script>
	import Header from '../components/Header.vue';
	import SettingsBasic from '../components/SettingsBasic.vue';
	import SettingsPersonal from '../components/SettingsPersonal.vue';

	export default {
		components: {
			Header,
			SettingsBasic,
			SettingsPersonal
		},

		data() {
			return {
				currentComponent: 'SettingsBasic',
				actived: 'SettingsBasic',
				navList: [
					{name: 'SettingsBasic', navItem: '基础设置'},
					{name: 'SettingsPersonal', navItem: '个人资料'}
				]
			}
		},

		methods: {
			//切换菜单
			menuSelected(index){
				this.currentComponent = index;
				this.actived = index;
			}
		},
	}
</script>

<style lang="stylus" scoped>
    .settings
        width 1080px
        margin 0 auto
</style>
