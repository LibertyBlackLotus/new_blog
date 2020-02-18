<!--评论组件-->
<template>
    <div class="container">
        <div class="comment" v-for="item in comments" :key="item.id">
            <div class="info">
                <img class="avatar" :src="item.User && item.User.photo" width="36" height="36"/>
                <div class="right">
                    <div class="name">{{item.User.user_name}}</div>
                    <div class="date">{{item.comment_date | dateFormat}}</div>
                </div>
            </div>
            <div class="content">{{item.comment_content}}</div>
            <div class="control">
                <span class="like" @click="likeClick(item)">
                    <i class="iconfont icon-like"></i>
                    <span class="like-num">{{item.comment_like_count > 0 ? item.comment_like_count + '人赞' : '赞'}}</span>
                </span>
                <span class="comment-reply" @click="showReplyInput(item)">
                    <i class="iconfont icon-comment"></i>
                    <span>回复</span>
                </span>
            </div>

            <div class="reply">
                <div class="item" v-for="reply in item.replys" :key="reply.id">
                    <div class="reply-content">
                        <!--<span class="from-name">{{reply.fromName}}</span><span>: </span>-->
                        <!--<span class="to-name">@{{reply.toName}}</span>-->
                        <span>{{reply.content}}</span>
                    </div>
                    <div class="reply-bottom">
                        <span>{{reply.reply_date | dateFormat}}</span>
                        <!--<span class="reply-text" @click="showReplyInput(item)">-->
                    <!--<i class="iconfont icon-comment"></i>-->
                        <!--<span>回复</span>-->
                    <!--</span>-->
                    </div>
                </div>

                <!--<div class="write-reply" v-if="item.reply && item.reply.length > 0" @click="showReplyInput(item)">-->
                    <!--<i class="el-icon-edit"></i>-->
                    <!--<span class="add-comment">添加新评论</span>-->
                <!--</div>-->
                <transition name="fade">
                    <div class="input-wrapper" v-if="showItemId === item.id">
                        <el-input class="gray-bg-input"
                                  v-model="inputReply"
                                  type="textarea"
                                  :rows="3"
                                  autofocus
                                  placeholder="写下你的回复">
                        </el-input>
                        <div class="btn-control">
                            <span class="cancel" @click="cancel">取消</span>
                            <el-button class="btn" type="primary" @click="commitReplySure(item)">确定</el-button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import {getUserId} from '../utils/common';

	export default {
		props: {
			comments: {
				type: Array,
				required: true
			},
			commitReply: Function,   //提交回复
			getComments:   Function,   //获取评论
		},

		data() {
			return {
				inputReply: '',
				showItemId: ''
			}
		},

		created() {
		},

		methods: {
			//评论点赞
			likeClick(comment) {
				let params = {
					comment_id: comment.comment_id,
					user_id: getUserId()
				};
				let _this = this;
				this.$http.post('/api/comments/praise', params)
					.then(res => {
						console.log('likeClick res: ', res);
						if (res.status != 200 || !res.data | !res.data.status) {
							this.$message({
								type: 'error',
								message: '点赞失败！'
							});
							return;
						}
						_this.getComments();
					});
			},

			// 提交回复
			commitReplySure(item) {
				console.log('commitReply---item->', item);
				console.log('commitReply---reply->', this.inputReply);
				this.commitReply(item.id, this.inputReply);
				this.inputReply = '';
				this.showItemId = ''
			},

			/**
			 * 点击回复
			 * item: 当前大评论
			 * reply: 当前回复的评论
			 */
			showReplyInput(item) {
				this.showItemId = item.id;
			},

			// 取消按钮
			cancel() {
				this.showItemId = ''
			},

		}

	}
</script>

<style lang="scss">
    @import "../assets/scss/index.scss";

    .container {
        padding: 0 10px;
        box-sizing: border-box;
        .comment {
            display: flex;
            flex-direction: column;
            padding: 10px;
            border-bottom: 1px solid $border-fourth;
            .info {
                display: flex;
                align-items: center;
                .avatar {
                    border-radius: 50%;
                }
                .right {
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;
                    .name {
                        font-size: 16px;
                        color: $text-main;
                        margin-bottom: 5px;
                        font-weight: 500;
                    }
                    .date {
                        font-size: 12px;
                        color: $text-minor;
                    }
                }
            }
            .content {
                font-size: 16px;
                color: $text-main;
                line-height: 20px;
                padding: 10px 0;
            }
            .control {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: $text-minor;
                .like {
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    cursor: pointer;
                    &.active, &:hover {
                        color: $color-main;
                    }
                    .iconfont {
                        font-size: 14px;
                        margin-right: 5px;
                    }
                }
                .comment-reply {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    &:hover {
                        color: $text-333;
                    }
                    .iconfont {
                        font-size: 16px;
                        margin-right: 5px;
                    }
                }

            }
            .reply {
                margin: 10px 0;
                border-left: 2px solid $color-main;
                .item {
                    margin: 0 10px;
                    padding: 10px 0;
                    border-bottom: 1px dashed $border-third;
                    .reply-content {
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        color: $text-normal;
                        .from-name {
                            color: $color-main;
                        }
                        .to-name {
                            color: $color-main;
                            margin-left: 5px;
                            margin-right: 5px;
                        }
                    }
                    .reply-bottom {
                        display: flex;
                        align-items: center;
                        margin-top: 6px;
                        font-size: 12px;
                        color: $text-minor;
                        .reply-text {
                            display: flex;
                            align-items: center;
                            margin-left: 10px;
                            cursor: pointer;
                            &:hover {
                                color: $text-333;
                            }
                            .icon-comment {
                                margin-right: 5px;
                            }
                        }
                    }
                }
                .write-reply {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: $text-minor;
                    padding: 10px;
                    cursor: pointer;
                    &:hover {
                        color: $text-main;
                    }
                    .el-icon-edit {
                        margin-right: 5px;
                    }
                }
                .fade-enter-active, fade-leave-active {
                    transition: opacity 0.5s;
                }
                .fade-enter, .fade-leave-to {
                    opacity: 0;
                }
                .input-wrapper {
                    padding: 10px;
                    .gray-bg-input, .el-input__inner {
                        /*background-color: #67C23A;*/
                    }
                    .btn-control {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        padding-top: 10px;
                        .cancel {
                            font-size: 16px;
                            color: $text-normal;
                            margin-right: 20px;
                            cursor: pointer;
                            &:hover {
                                color: $text-333;
                            }
                        }
                        .confirm {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }


</style>
