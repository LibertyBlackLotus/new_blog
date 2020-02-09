<template>
  <div class="editor">
    <el-row class="noteTitle">
      <el-input v-model="title" placeholder="请输入标题" class="noteTitleInput"></el-input>
    </el-row>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }" class="menu">
      <div>
        <el-button type="primary" size="small" icon="el-icon-picture" @click="showImagePrompt(commands.image)">
          图片
        </el-button>
        <el-button type="primary" size="small" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
          Bold
        </el-button>
        <el-button type="primary" size="small" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
          Italic
        </el-button>
        <el-button type="primary" size="small" :class="{ 'is-active': isActive.blockquote() }" @click="commands.blockquote">
          Blockquote
        </el-button>
        <el-button type="info" size="small" :class="{ 'is-active': isActive.code() }" @click="commands.code">
          Code
        </el-button>
        <el-button type="info" size="small" :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                   @click="commands.heading({ level: 1})">
          H1
        </el-button>
        <el-button type="info" size="small" :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                   @click="commands.heading({ level: 2 })">
          H2
        </el-button>
        <el-button type="info" size="small" :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                   @click="commands.heading({ level: 3 })">
          H3
        </el-button>

        <el-button type="warning" size="small" :class="{ 'is-active': isActive.link() }" @click="setLinkUrl(commands.link, null)">
          Link
          <span>{{ isActive.link() ? 'Update Link' : 'Add Link'}}</span>
        </el-button>
        <el-button type="danger" size="small" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
          Strike
        </el-button>
        <el-button type="danger" size="small" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
          Underline
        </el-button>
        <el-button type="success" size="small" icon="el-icon-back" @click="commands.undo">
          Undo
        </el-button>
        <!--<el-button type="success" size="small" icon="el-icon-right" @click="commands.redo">-->
          <!--Redo-->
        <!--</el-button>-->

        <el-button type="success" size="small" icon="el-icon-upload" @click="noteBookSaveArticle">
          保存
        </el-button>
        <el-button type="success" size="small" icon="el-icon-s-promotion" @click="noteBookPublishArticle">
          发布
        </el-button>

        <el-button type="danger" size="small" @click="noteBookRemoveArticle">
          删除
        </el-button>


      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" class="content"></editor-content>
  </div>

</template>

<script>
  import {Editor, EditorContent, EditorMenuBar} from 'tiptap';
  import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
    HorizontalRule,
    Image
  } from 'tiptap-extensions';

  export default {
    props: {
      saveArticle:    Function,   //创建文章
      updateArticle:  Function,   //更新文章
      publishArticle: Function,   //发布文章
      removeArticle:  Function,   //发布文章
      article:        Object,     //文章数据
    },
    components: {
      EditorContent,
      EditorMenuBar
    },

    data() {
      return {
        editor: null,
        title:　'',
        json: '',
        html: '',
      }
    },

    created(){
      this.editor = new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({levels: [1, 2, 3]}),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new HorizontalRule(),
          new Image(),
        ],
        content: `
          <h1>文章内容</h1>
        `,
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON();
          this.html = getHTML();
        },
      })
    },

    mounted() {
      if(this.article){
        this.setContent(this.article);
      }
    },

    beforeDestroy() {
      this.editor.destroy();
    },

    methods: {
      setLinkUrl(command, url) {
        command({href: url});
      },

      showImagePrompt(command) {
        if (src !== null) {
          command({src})
        }
      },

      //填充内容
      setContent(article){
        this.title = article.article_title;
        this.editor.setContent(article.article_content);
//        this.editor.setContent({
//          type: 'doc',
//          content: [{
//            type: 'paragraph',
//            content: [
//              {
//                type: 'text',
//                text: article.article_content,
//              },
//            ],
//          }],
//        }, true);
        this.editor.focus();
      },

      // 清除内容
      clearContent() {
        this.editor.clearContent(true);
        this.editor.focus();
      },

      // 保存/创建文章
      noteBookSaveArticle() {
        if(this.article){ //更新
          let data = {
            id: this.article.article_id,
            title: this.title,
            content: this.html
          };
          this.updateArticle(data);
        }else{  //创建
          let data = {
            title: this.title,
            content: this.html
          };
          this.saveArticle(data);
        }
      },

      noteBookRemoveArticle(){
        let data = {article_id: this.article.article_id};
        this.removeArticle(data);
      },

      //发布文章
      noteBookPublishArticle(){
        let data = {
          article_id: this.article.article_id
        };
        this.publishArticle(data);
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .editor
    padding 10px 30px
  .noteTitle
    height 60px
    font-weight 600
  .menu
    margin-bottom 20px
  .content
    outline none !important

</style>
