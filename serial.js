import fs from 'fs';

import { jsdom } from 'jsdom';

import test from 'ava';

var window = jsdom(fs.readFileSync('./test.html')).defaultView;
var document = window.document;

function jsdomTest() {
    return new Promise(function (resolve, reject) { 
        jsdom.jQueryify(window, "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.js", function () {
            resolve(window.jQuery);
        });
    });
}

test.serial('点击测试', async t => {
    var $ = await jsdomTest();

    var $div = $('#div');

    var colorBeforeClick, colorAfterClick;

    console.log(colorBeforeClick = $div.css('background-color'));

    $div.trigger('click');

    console.log(colorAfterClick = $div.css('background-color'));
    
    t.not(colorBeforeClick, colorAfterClick, 'bgColor changed');
});


test.serial('串行测试', function (t) {
    console.log(window.$)
    t.truthy(window.$, '串行成功');
});
