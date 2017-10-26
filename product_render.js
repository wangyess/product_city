;(function () {
    'use strict';

    //......................................................选中html中的元素
    var my_form = document.getElementById('my-form');
    var t_body = document.getElementById('t-body');
    var btn_search = document.getElementById('btn_search');
    var btn_set = document.getElementById('btn_set');
    jian_ting();

    //......................................................监听全局
    function jian_ting() {
        //渲染
        render();
        //submit 监听
        sub_form();
        //查找   监听
        search();
        //重置   监听
        a_set();
    }

    //.....................................................................获取页面输入的值 并转化为对象
    function get_input_value() {
        var data = {};
        var input_list = my_form.children;
        for (var i = 0; i < input_list.length; i++) {
            var input = input_list[i];
            var key = input.getAttribute('name');
            var val = input.value;
            input.value = '';
            data[key] = val;
        }
        return data;
    }

    // ................................................................................绑定增加事件
    function sub_form() {
        my_form.addEventListener('submit', function (e) {
            //防止默认操作
            e.preventDefault();
            //页面的值 会被转化成对象 在这里获取  input_item页面输入的对象
            var input_item = get_input_value();
            //判断 如果有的为空 则不能添加
            if (!input_item.title || !input_item.price) {
                return;
            }
            //判断 如果价格不是数字类型 则不能添加
            if (!isNaN(input_item.price)) {
                if (input_item.id) {
                    b.updata(input_item.id, input_item);
                }
                else {
                    b.add(input_item);
                }
                render();
            }
        })
    }

    //.................................................................................绑定删除事件
    function del_item(a, id) {
        a.addEventListener('click', function () {
            b.del(id);
            render();
        })
    }

    //.................................................................................绑定修改事件
    //.首先要获取到修改的对象  并把它的值传入到input上 在通过提交进行更改
    function up_item(a, id) {
        a.addEventListener('click', function () {
            // 获取到了修改的对象
            var finded_item = b.read(id);
            set_input_val(finded_item);
        })
    }

    //.................................把对象传入到input中
    function set_input_val(pack) {
        for (var temp in pack) {
            var val = pack[temp];
            var input = document.querySelector('[name=' + temp + ']');
            if (!input) {
                continue;
            }
            input.value = val;
        }
    }

    //................................................................................绑定查找事件
    function search() {
        btn_search.addEventListener('click', function () {
            //..........从页面上获取输入的关键字
            var keyword = document.querySelector('[name=title]').value;
            //....把关键字传入到 查找对象方法中  返回一个所有有这个关键字的数组
            var arr = b.search_s(keyword);
            render(arr);
        })
    }

    //....................................................................................绑定重置
    function a_set() {
        btn_set.addEventListener('click', function () {
            render();
        })
    }

    //....................................................................................绑定热卖
    function set_hot_product(a, id) {
        a.addEventListener('click', function () {
            d.add_h(id);
        })
    }

    //....................................................................................渲染页面
    function render(arr) {
        var comment;
        // 获取的是整个商品的数据列表
        var get_data_list = b.read();

        if (arr) {
            comment = arr;
        } else {
            comment = get_data_list;
        }

        var btn_del, btn_upd, set_hot;
        t_body.innerHTML = '';

        comment.forEach(function (item) {
            var table_tr = document.createElement('tr');
            table_tr.bgColor = '#fff';
            table_tr.innerHTML = `
            <td style="width: 150px"> ${item.id}</td>
            <td style="width: 300px"> ${item.title}</td>
            <td style="width: 150px"> ${item.price}</td>
            <td style="width: 50px"><button id="btn_del_${item.id}">删除</button> </td>      
            <td style="width: 50px"><button id="btn_upd_${item.id}">修改</button> </td>      
            <td style="width: 50px"><button id="set_hot_${item.id}">设置为热卖</button> </td>      
            `;
            t_body.appendChild(table_tr);

            //选中button
            //删除
            btn_del = document.querySelector('#btn_del_' + item.id);
            del_item(btn_del, item.id);
            //修改
            btn_upd = document.querySelector('#btn_upd_' + item.id);
            up_item(btn_upd, item.id);
            //热卖
            set_hot = document.querySelector('#set_hot_' + item.id);
            set_hot_product(set_hot, item.id);
        })
    }


})();