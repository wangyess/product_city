;(function () {
    'use strict';
    //选中所有的元素
    var all_link = document.querySelectorAll('[data-link]');
    var all_page = document.querySelectorAll('[data-page]');
    //定义一个变量去接收每次点击 的名字 让下次在显示他
    var first_show;
    //给链接添加点击事件  让其跳转
    init();

    function init() {
        //第一次刷新时候显示home
        first_show = s.get('first_show') || 'home';
        render(first_show);

        all_link.forEach(function (item_link) {
            item_link.addEventListener('click', function () {
                //当它被点击的时候获取它的键值 之后和后面的判断是否相等
                var item_name = item_link.dataset.link;
                //把这个名字存入到 first_show 的local 中
                s.set('first_show', item_name);
                render(item_name);
            })
        })
    }

    function render(item_name) {
        all_page.forEach(function (item_page) {
            //先把所有的都隐藏  在判断把名字一样的显示出来
            item_page.hidden = true;
            if (item_page.dataset.page === item_name) {
                item_page.hidden = false;
            }
        })
    }
})();