/**
 *  验证工具类
 * @author zhangyou04
 */
define([], function () {
    var isNotEmpty = function (val) {
        return !(val === '' || val === null);
    };
    var minLength = function (val, min) {
        return (val || '').length >= min;
    };
    var maxLength = function (val, max) {
        return (val || '').length <= max;
    };
    var checkByRegExp = function (val, reg) {
        return reg.test(val);
    };
    var validator = {
        messages: [],
        decorators: {},
        config: {
            // environment
            environment: {
                envTypeName: ['checkEnvEmpty', 'checkEnvName'],
                envInfo: ['checkEnvInfo']
            }
   
        },
        sortProps: [],
        types: {
            // environment 
            checkEnvEmpty: {
                validate: isNotEmpty,
                msg: '请输入环境名称'
            },
            checkEnvName: {
                regExp: /^[\d\w-_]{1,64}$/i,
                validate: checkByRegExp,
                msg: '请输入正确的环境名称，只能包含数字、字母、中划线-、下划线_，最大长度64'
            },
            checkEnvInfo: {
                validate: isNotEmpty,
                msg: '请输入环境描述信息'
            }
        },
        /**
         * 根据输入的验证参数得出验证是否通过
         * @param  {string or object} key required
         *         key 是string时，需传val值，val为对应的key的值;
         *         key 是object时，无需传val参数，验证这个object下的相关属性值是否均合法
         * @param  {dynamic} val option 当第一个参数是string类型时，单一key验证，需传入val值，否则无需传
         * @param  {string} parentKey 配置规则，在config对象中的一个key,验证会依据对应配置来进行验证
         * @return {boolean}           验证结果通过 true 不通过 false
         */
        validate: function (key, val, parentKey) {
            var me = this,
                rules = [],
                checker,
                pro,
                i;

            this.messages = [];

            if (typeof arguments[0] === 'object') {
                var data = arguments[0];
                parentKey = val;

                if (this.sortProps && this.sortProps.length) {
                    this.sortProps.forEach(function (pro, index) {
                        if (data.hasOwnProperty(pro)) {
                            me._checkRulesByKey(pro, data[pro], parentKey);
                        }
                    });
                } else {
                    for (pro in data) {
                        if (data.hasOwnProperty(pro)) {
                            this._checkRulesByKey(pro, data[pro], parentKey);
                        }
                    }
                }
            } else {
                this._checkRulesByKey(key, val, parentKey);
            }

            return !this.hasError();
        },
        setSortPros: function (pros) {
            this.sortProps = pros || this.sortProps;
        },
        hasError: function () {
            return !!this.messages.length;
        },
        getMessages: function () {
            return this.messages;
        },
        getFirstMessageText: function () {
            return this.messages[0].text;
        },
        decorate: function (key, decorator) {
            this.decorators[key] = decorator;
        },
        removeDecorator: function (key) {
            delete this.decorators[key];
        },
        setDecoratorParams: function (key, params) {
            this.decorators[key].params = params;
        },
        setDecoratorMsg: function (key, msg) {
            this.decorators[key].msg = msg;
        },
        _checkRulesByKey: function (key, val, parentKey) {
            if (!this.config[parentKey]) {
                throw new Error('没有' + parentKey + '这个配置项在验证对象中，请确保该配置存在');
            }
            var rules = (parentKey && this.config[parentKey]) ? this.config[parentKey][key] : this.config[key];
            var checker = null;
            var decorator = null;

            if (!rules || rules.length == 0) {
                return;
            }

            for (var i = 0; i < rules.length; i++) {
                checker = this.types[rules[i]];
                decorator = this.decorators[rules[i]];

                if (checker && !checker.validate(val, checker.regExp || checker.length)) {
                    this.messages.push({parentKey: parentKey, role: key, text: checker.msg});
                    break;
                } else if (decorator) {
                    if (!decorator.validate.apply(this, decorator.params)) {
                        this.messages.push({parentKey: parentKey, role: key, text: decorator.msg});
                    }
                }
            }
        }
    };

    return validator;
});
