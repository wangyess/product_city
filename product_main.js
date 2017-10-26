;(function () {
    'use strict';
    //.................................定义商品的两个数据...............................
    var data_list, last_id;

    //...........................暴露出来一个接口用来调用下面的方法........................
    window.b = {
        add: add,
        del: del,
        updata: updata,
        read: read,
        search_s: search_s,
    };

    //....................................初始化数据...................................
    init();

    function init() {
        data_list = s.get('data_list');
        last_id = s.get('last_id');
        if (!data_list) {
            data_list = [];
            up_data_list();
        }
        if (!last_id) {
            last_id = 0;
            s.set('last_id', last_id);
        }
    }

    //.......................................增加....................................
    function add(pack) {
        pack.id = s.get('last_id') + 1;
        pack.id = parseInt(pack.id);
        data_list.push(pack);
        up_data_list();
        up_last_id();
    }

    //.......................................删除....................................
    function del(id) {
        id = parseInt(id);
        var id_index = search_id_index(id);
        if (id_index !== -1) {
            data_list.splice(id_index, 1);
        }
        up_data_list();
    }

    //.......................................修改.....................................
    function updata(id, pack) {
        id = parseInt(id);
        pack.id = parseInt(pack.id)
        var up_index = search_id_index(id);
        var item_data = data_list[up_index];
        data_list[up_index] = Object.assign({}, item_data, pack);
        up_data_list();
    }

    //.......................................查找.....................................
    function read(id) {
        if (id) {
            return find_item(id);
        }
        else {
            return data_list;
        }
    }

    //................................通过输入的关键词查找对象  返回用有关键字对象装成的数组............................
    function search_s(keyword) {
        var ad = [];
        data_list.forEach(function (item) {
            if (item.title.indexOf(keyword) !== -1) {
                ad.push(item);
            }
        });
        return ad;
    }

    //......................................超找对象...................................
    function find_item(id) {
        return data_list.find(function (item) {
            if (item.id === id) {
                return true
            }
        })
    }

    //......................................超找对象索引................................
    function search_id_index(id) {
        return data_list.findIndex(function (item) {
            if (item.id === id) {
                return true;
            }
        })

    }
    // .................................... 辅助函数...................................
    function up_data_list() {
        s.set('data_list', data_list);
    }

    function up_last_id() {
        last_id = s.get('last_id')
        s.set('last_id', last_id + 1);
    }
})();