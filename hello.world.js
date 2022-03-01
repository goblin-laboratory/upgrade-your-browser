
function addUtmSource(event) {
    var target = event.target ? event.target : event.srcElement,
        url = target.href;
    if (url.indexOf('utm_source=') === -1)
        target.href = url + (url.indexOf('?') !== -1 ? '&' : '?') + 'utm_source=InternalLinks';
}
var links = document.getElementsByTagName('a');
for (i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.href.indexOf(window.location.hostname) !== -1) {
        if (link.addEventListener) {
            link.addEventListener('click', addUtmSource, false);
        } else if (link.attachEvent) {
            link.attachEvent('onclick', addUtmSource);
        }
    }
}

var isXPmax = navigator.userAgent.match(/Windows NT (3|4|5)/g);
var isNotChrome = typeof window.chrome === 'undefined';

var realPathname = window.location.pathname;
// ie 兼容
if (realPathname.indexOf('/') !== 0) {
    realPathname = '/' + realPathname;
}
var isUPPage = realPathname === '/upgrade-your-browser.html';

if (isXPmax && isNotChrome && !isUPPage) {

    var links = document.getElementsByTagName('a');
    var i = 0;
    for (i = 0; i < links.length; i++) {
        var url = links[i].href;
        if (
            url.indexOf('https://') === 0
            && links[i].hostname.lastIndexOf('.dmeng.net') === -1
            && links[i].hostname.lastIndexOf('.upaiyun.com') === -1
            && links[i].hostname.lastIndexOf('.cdn.bcebos.com') === -1
        ) {
            links[i].href = 'http://' + url.substr(7).replace(/^\/+/, "");
        }
    }
}

var isSpHost = window.location.hostname === 'support.dmeng.net';
var doTrack = typeof dnt === 'undefined';
if (doTrack === false && document.cookie.match(/dnt=1/) === null) {
    var now = new Date();
    var time = now.getTime();
    time += 600 * 1000;
    now.setTime(time);
    document.cookie =
        'dnt=1' +
        '; expires=' + now.toUTCString() +
        '; path=/';
}
var _hmt = _hmt || [];
if (isSpHost) {

    if (doTrack) {

        // 统计代码
        var content_url = realPathname + window.location.search + window.location.hash,
            referer_url = typeof targetUrl === 'string' && targetUrl !== "" ? targetUrl : document.referrer;

        _hmt.push(['_setAccount', 'c2db66e0055231a87bc4d633e0d48fbc']);

        // 统计需要升级的IE版本
        if (isUPPage) {

            var iever = "none";

            var _jsver = 0;
            /*@cc_on
                _jsver = @_jscript_version;
            @*/
            if (_jsver === 0) {
                // IE11 或者不是 IE

                if (!!window.MSInputMethodContext && !!document.documentMode) {
                    iever = 11;
                }
            } else {
                var docmode = document.documentMode;
                if (!!docmode && docmode > 5) {
                    iever = docmode;
                } else if (_jsver === 5.7 && window.XMLHttpRequest) {
                    iever = 7;
                } else if (_jsver === 5.6 || (_jsver === 5.7 && !window.XMLHttpRequest)) {
                    iever = 6;
                } else {
                    iever = 5;
                }
                iever += "";
            }

            var winver = '';
            var ua = navigator.userAgent;

            if (ua.indexOf("Windows NT 5") !== -1) {
                winver = 'winXP';
            } else if (ua.indexOf("Windows NT 6.1") !== -1) {
                winver = 'win7';
            } else if (ua.indexOf("Windows NT 6.2") !== -1) {
                winver = 'win8';
            } else if (ua.indexOf("Windows NT 6.3") !== -1) {
                winver = 'win8.1';
            } else if (ua.indexOf("Windows NT 10") !== -1) {
                winver = 'win10';
            }

            _hmt.push(['_setCustomVar', 1, 'ClientVer', winver + "_IE" + iever, 3]);
        }

    } else {

        _hmt.push(['_setAccount', 'f1d86bbdf511be26d12490077814fa40']);

    }
} else {
    _hmt.push(['_setAccount', '2a2b9a0de115b107423956298f518739']);
}

var helloWorldJS = document.getElementById('hello-world-js');
var hm = document.createElement("script");
hm.src = "//hm.baidu.com/hm.js?" + _hmt[0][1];
helloWorldJS.parentNode.insertBefore(hm, helloWorldJS);

var isBackupHost = window.location.hostname === 'backup.support.dmeng.net';
if (isBackupHost) {
    var links = document.getElementsByTagName('a');
    for (i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.href.indexOf('support.dmeng.net') !== -1) {
            var url = link.href;

            if (url.indexOf('utm_source=backup') === -1) {

                var spos = url.indexOf('?');
                if (spos > 1) {
                    url = url.substr(0, spos);
                }

                url += '?utm_source=backup';
                if (link.search.length > 1) {
                    url += '&' + link.search.substr(1);
                }

                link.href = url;
            }
        }
    }
}
