<template>
    <Card class="footerContent">
        <Timeline>
            <TimelineItem color="red">
                <p class="time">2020年2月8日</p>
                <p class="content">昆朋网站开始研发</p>
            </TimelineItem>
            <TimelineItem color="green">
                <p class="time">2020年2月23日</p>
                <p class="content">1.0.0版本内部测试</p>
            </TimelineItem>
            <TimelineItem color="blue">
                <p class="time">2020年3月1日</p>
                <p class="content">1.0.0版本正式上线</p>
            </TimelineItem>
        </Timeline>
    </Card>
</template>

<style lang="stylus" scoped>
    .footerContent
        width 1080px
        margin 0 auto
    .time
        font-size 16px
        font-weight 600

</style>
