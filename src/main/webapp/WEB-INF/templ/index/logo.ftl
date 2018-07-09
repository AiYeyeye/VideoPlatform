<!-- 五周年 6.26~7.1 7.2~7.6 -->
<!-- logo search start -->
<div class="Page search_box_top" id="Nav01">
    <div class="fl Logo">
        <img class="fl" src="https://static1.51cto.com/edu/center/images/activity/logo_01.png">
    </div>
    <div class="fr Search" id="SearchCon">
        <form class="form-search" id="Search" method="get" action="http://edu.51cto.com/center/course/index/search" target="_blank">
            <button type="submit" class="fr" onclick="if($.trim($('#searchQ').val()).length==0){return false;};_educto.push(['_trackEvent', 'edu', 'search',$('#searchQ').val()])"></button>
            <input type="text" class="fr" id="searchQ" name="q" placeholder="找课程、找讲师" autocomplete="off">
        </form>
        <div class="hotKey">
            <a href="http://edu.51cto.com/courselist/47.html" target="_blank">系统运维</a>
            <a href="http://edu.51cto.com/center/course/index/search?q=Excel企业实战" target="_blank">Excel企业实战</a>
            <a href="http://edu.51cto.com/center/course/index/search?q=自动化测试" target="_blank">自动化测试</a>
        </div>
        <div class="association"><div class="list" id="associationList"></div></div>
    </div>
    <div class="clear"></div>
</div>
<!-- logo search end -->
