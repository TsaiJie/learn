const REG_MODEL = /\{\{(.+?)\}\}/;
class MVVM {
    constructor(el, dataObj) {
        this.data = dataObj;
        this.el = document.querySelector(el);
        this.domPool = {};
        this.init();
    }
    init() {
        this.initDom(this.el);
        this.initInputEvent(this.el);
        this.initData();
    }
    // 数据变成响应式的
    initData() {
        const _this = this;
        this.data = new Proxy(this.data, {
            get(target, key) {
                return Reflect.get(target, key);
            },
            set(target, key, value) {
                _this.domPool[key].innerText = value;
                return Reflect.set(target, key, value);
            },
        });
    }
    // 为每一个input绑定事件
    initInputEvent(el) {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', this.handleInput.bind(this), false);
        });
    }
    // 处理input
    handleInput(e) {
        const key = e.target.getAttribute('v-model');
        const value = e.target.value;
        this.data[key] = value;
    }
    // 建立映射
    initDom(el) {
        const children = el.childNodes;
        children.forEach(item => {
            // 判断是否是文本节点
            if (item.nodeType === 3) {
                // 判断是否是换行以及空文本
                if (item.nodeValue.trim().length) {
                    // 判断是否是双括弧
                    const isModel = REG_MODEL.test(item.nodeValue);
                    if (isModel) {
                        const key = item.nodeValue.match(REG_MODEL)[1].replace(/"/g, '').trim();
                        const parentNode = item.parentNode;
                        console.log(this.data[key] || undefined);
                        parentNode.innerText = this.data[key] || undefined;
                        this.domPool[key] = parentNode;
                    }
                }
            }
            // 如果有孩子节点就就递归
            item.childNodes && this.initDom(item);
        });
    }
    setData(key, value) {
        this.data[key] = value;
    }
}
