<template>
    <div style="margin-top: 10px; margin-bottom: 10px;">
        <quill-editor disabled="disabled"
                       :options="editorOption"
                v-model="articleContent" >
        </quill-editor>
    </div>
</template>

<script>
	import {
		quillEditor
	} from 'vue-quill-editor';
	import 'quill/dist/quill.snow.css';

	export default {
		props: {
			content: String,  //文章内容
		},

        data(){
		    return{
				editorOption: {
					placeholder: "正文加载中...",
					theme: "snow",
					modules: {
						toolbar:  null
					}
				}
            }
        },

        computed: {
			articleContent: {
				// getter
				get: function () {
					return this.content;
				},
				// setter
				set: function (newValue) {
				}
            }
        },

		components: {
			quillEditor
		}
	}
</script>

<style lang="stylus" scoped>

</style>
