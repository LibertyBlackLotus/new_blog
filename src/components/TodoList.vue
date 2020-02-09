<template>
    <el-row class="content">
        <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>
        欢迎：{{user_name}}！你的待办事项是：
      </span>
            <el-row>
              <el-col :span="12">
                <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
              </el-col>
              <el-col :span="12"><el-button size="small" type="primary" @click="addTodos">添加</el-button></el-col>
            </el-row>
            <el-tabs v-model="activeName">
                <el-tab-pane label="待办事项" name="first">
                    <el-col :xs="24">
                        <template v-if="!Done"> <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
                            <template v-for="(item, index) in list">
                                <div class="todo-list" v-if="item.status == false">
                  <span class="item">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                                    <span class="pull-right">
                    <el-button size="small" type="primary" @click="update(index)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                                </div>
                            </template>
                        </template>
                        <div v-else-if="Done">
                            暂无待办事项
                        </div>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="已完成事项" name="second">
                    <template v-if="count > 0">
                        <template v-for="(item, index) in list">
                            <div class="todo-list" v-if="item.status == true">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                                <span class="pull-right">
                  <el-button size="small" type="primary" @click="update(index)">还原</el-button>
                </span>
                            </div>
                        </template>
                    </template>
                    <div v-else>
                        暂无已完成事项
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
	export default {
		data () {
			return {
        user_name: 'lin',
				todos: '',
				activeName: 'first',
				list:[],
				count: 0
			};
		},
    created: function(){
      const userInfo = this.getUserInfo();
      if(userInfo != null){
        this.id = userInfo.id;
        this.user_name = userInfo.user_name;
      }else{
        this.id = '';
        this.user_name = ''
      }
      this.getTodolist();  // 新增：在组件创建时获取todolist
    },
		computed: { // 计算属性用于计算是否已经完成了所有任务
      userName: function() {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        return userInfo != null ? userInfo.user_name : '';
      },

			Done(){
				let count = 0;
				let length = this.list.length;
				for(let i in this.list){
					this.list[i].status == true ? count += 1 : '';
				}
				this.count = count;
				if(count == length || length == 0){
					return true
				}else{
					return false
				}
			}
		},

		methods: {
			addTodos() {
				if(this.todos == '')
					return;
				let obj = {
					status: false,
					content: this.todos,
          id: this.id
				};
				this.$http.post('/api/todolist', obj)
          .then((res) => {
            if(res.status == 200){
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
              this.getTodolist();
            }else{
              this.$message.error('创建失败！');
            }
          }, (err) => {
            this.$message.error('创建失败！');
            console.log(err);
          });
				this.todos = '';
			},
			remove(index) {
			  this.$http.delete('/api/todolist/' + this.id + '/' + this.list[index].id)
          .then(res => {
            console.log('remove res: ', res);
            if(res.status == 200){
              this.$message({
                type: 'success',
                message: '任务删除成功！'
              });
              this.getTodolist();
            }else{
              this.$message.error('任务删除失败！');
            }
          }, (err) => {
            this.$message.error('任务删除失败！');
            console.log(err);
          });
			},
      update(index) {
        this.$http.put('/api/todolist/' + this.id + '/' + this.list[index].id + '/' + this.list[index].status)
          .then(res => {
            if(res.status == 200){
              this.$message({
                type: 'success',
                message: '任务状态更新成功！'
              });
              this.getTodolist();
            }else{
              this.$message.error('任务状态更新失败！');
            }
          }, (err) => {
            this.$message.error('任务状态更新失败！');
            console.log(err);
          });
      },
      getTodolist(){
			  this.$http.get('/api/todolist/' + this.id)
          .then((res) => {
			      console.log('res: ', res);
            if(res.status == 200){
              this.list = res.data;
            }else{
              this.$message.error('获取列表失败！');
            }
          }, (err) => {
            this.$message.error('获取列表失败！');
            console.log(err);
          });
      },
      getUserInfo(){
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        return userInfo != null ? userInfo : '';
      }
		}
	};
</script>

<style lang="stylus" scoped>
    .el-input
        margin 20px auto
    .todo-list
        width 100%
        margin-top 8px
        padding-bottom 8px
        border-bottom 1px solid #eee
        overflow hidden
        text-align left
        .item
            font-size 20px
            &.finished
                text-decoration line-through
                color #ddd
    .pull-right
        float right
</style>
