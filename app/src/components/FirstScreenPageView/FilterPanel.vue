<template>
	<div class="filter-area" :class="{pL32: !sideBarStatus}">
		<div class="is-clearfix">
			<div class="tabs is-boxed is-small filter-form-nav">
				<ul>
					<li v-for="item in filterFormNav"
						:class="{'is-active': $index === activeFilterFormIndex}"
						@click="changeTab($index)">
						<a href="javascript:;">
							<span>{{item}}</span>
						</a>
					</li>
				</ul>
			</div>
			
			<div >
				<filter-form-single-logic :active-filter-form-index v-show="activeFilterFormIndex === 0" class="is-pulled-left"></filter-form-single-logic>
				<filter-form-single-group :active-filter-form-index v-show="activeFilterFormIndex === 1" class="is-pulled-left"></filter-form-single-group>
			</div>

			<div class="is-pulled-right">
				<button class="button" title="筛选完成，导出文件" @click="exportFile">导出</button>
			</div>
		</div>
		<filter-tag-list></filter-tag-list>
	</div>
</template>

<script>
	import FilterTagList from './FilterTagList'
	import FilterFormSingleLogic from './FilterFormSingleLogic'
	import FilterFormSingleGroup from './FilterFormSingleGroup'
	import { getFilterList, getSideBarStatus} from '../../vuex/getters'
	import { exportFile } from '../../vuex/actions'

	export default{
		components: {
			FilterTagList,
			FilterFormSingleLogic,
			FilterFormSingleGroup
		},
		data() {
			return {
				curCol: 1,
				filterVal: "",
				colOfSheet: 1,
				filterFormNav: ["单列逻辑", "单列组合逻辑", "多列运算逻辑"],
				activeFilterFormIndex: 0
			}
		},
		vuex: {
			getters: {
				sideBarStatus: getSideBarStatus
			},
			actions: {
				exportFile
			}
		},
		methods: {
			changeTab(index){
				this.activeFilterFormIndex = index
			},
			submit(){
				if(filterVal.tirm().length === 0) return false
			}
		}
	}
</script>

<style scoped>
	.filter-area>*{
		padding: 5px;
	}
	.filter-area{
		transition: all .6s
	}
	.pL32{
		padding-left: 32px;
	}
	#filter-form{
		margin-bottom: 0
	}
	#filter-form input{
		border-radius: 3px 0 0 3px;
	}
	#filter-form .label{
		/*vertical-align: middle;*/
		line-height: 32px;
	}
	.filter-area.isShowSideBar{
		padding-left: 28px;
	}
	.tabs{
		margin-bottom: 0;
	}
</style>