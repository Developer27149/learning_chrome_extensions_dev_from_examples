// incognito mode 无痕模式
// 是否允许第三方设置cookie， 这是一个对象
// chrome 对此站点提供了那些信息的设置对象
// 不可用的时候是布尔值，默认true，否则是一个设置对象
// https://developer.chrome.com/docs/extensions/reference/types/#type-ChromeSetting
const pref = chrome.privacy.websites.thirdPartyCookiesAllowed; 

// 辅助函数，便于通过 ID 获取元素
function $(id) {
  return document.getElementById(id);
}

// 判定控制等级，返回是否具有修改设置的权限
function settingIsControllable(levelOfControl) {
  return (levelOfControl === "controllable_by_this_extension"
    || levelOfControl === 'controlled_by_this_extension')
}

function updateUI(settings) {
  // 如果控制对象的控制等级是可控，则 disableUI 是false
  const disableUI = !settingIsControllable(settings.levelOfControl);
  // 将 id 为 regularValue 的元素设置为不可用, 隐私模式下设置也不可用
  $('regularValue').disabled = disableUI;
  $('useSeparateIncognitoSettings').disabled = disableUI;
  if (settings.hasOwnProperty('incognitoSpecific')) {
    const hasIncognitoValue = settings.incognitoSpecific;
    $("useSeparateIncognitoSettings").checked = hasIncognitoValue;
    $("incognitoValue").disabled = disableUI || !hasIncognitoValue;
    $("incognitoValue").checked = settings.value;
  } else {
    $("regularValue").checked = settings.value;
  }
}

function updateUIFromGet(settings) {
  if (settings) {
    console.log(`pref.get result：${JSON.stringify(settings)}`);
    updateUI(settings) // 确定获取到了设置对象，传入并且更新 UI
  }
}

function updateUIFromOnChange(settings) {
  console.log(`pref.onChange event: ${JSON.stringify(settings)}`);
}

function init() {
  // 获取当前扩展在隐私模式下是否可用，传给回调函数一个返回结果
  chrome.extension.isAllowedIncognitoAccess(function (allowed) {
    if (allowed) {
      // 如果允许在隐私模式下使用，则在隐私模式下获取第三方cookie控制对象，并且传入回调函数
      // 回调函数获取到设置对象
      pref.get({ 'incognito': true }, updateUIFromGet)
      console.log('allow');
    } else {
      console.log('not allowed');
    }
    // 获取所有配置，不止是隐私模式
    pref.get({}, updateUIFromGet)
    // pref.onChange.addEventListener(updateUIFromOnChange)
  })
}

document.addEventListener("DOMContentLoaded", init)