document.addEventListener('DOMContentLoaded', function() {

    var defaultConfig = {color: 'white', showImage: true}; // 默认配置
    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    chrome.storage.sync.get(defaultConfig, function(items) {
        document.getElementById('color').value = items.color;
        document.getElementById('show_image').checked = items.showImage;
    });
});
function shortMessage( tip){
    document.getElementById('status').textContent = tip;
    var t = () => {document.getElementById('status').textContent = ''; clearTimeout(t);}
    setTimeout(t, 800);
}
document.getElementById('color').addEventListener('change', function () {
    var color = document.getElementById('color').value;
    shortMessage("更换预览...,color:"+ color);
    document.body.style.backgroundColor = color;

});
document.getElementById('save').addEventListener('click', function() {
    var color = document.getElementById('color').value;
    document.getElementById('status').textContent= "修改状态...,color:"+ color;


    var showImage = document.getElementById('show_image').checked;
    // 这里貌似会存在刷新不及时的问题
    //chrome.extension.getBackgroundPage().showImage = showImage; // 让background即使生效
    chrome.storage.sync.set({'color': color, 'showImage': showImage}, function() {
        // 注意新版的options页面alert不生效！
        shortMessage('保存成功！' + 'color:'+color+',showImage:'+ showImage);
    });
    document.body.style.backgroundColor = color;

});

// 加载设置
var defaultConfig = {color: 'white'}; // 默认配置
chrome.storage.sync.get(defaultConfig, function(items) {
    document.body.style.backgroundColor = items.color;
});