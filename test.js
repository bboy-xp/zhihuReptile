const axios = require('axios');
const cheerio = require("cheerio");
let url = "https://www.zhihu.com/question/35931336/answer/228278520";
let Data = {};
axios.get(url).then(
    res => {

        let html = res.data;
        let $ = cheerio.load(html, {
            decodeEntities: false
        });
        console.log("------------------");
        let content = $('.RichContent-inner').find('p, b, blockquote, strong').text();
        //图片
        let imgArr = [];
        $('figure').find('img').each(function (i, e) {
            let imgurl = $(this).attr("data-default-watermark-src");
            if (imgurl) {
                imgArr.push(imgurl);
            }
        });
        // 视频
        let videoArr = [];
        $('.video-box').find('.url').each(function(i, e) {
            let videoUrl = $(this).text();
            if (videoUrl) {
                videoArr.push(videoUrl);
            }
        });
        let data = {
            content: content,
            imgArr: imgArr,
            videoArr: videoArr
        };
        Data = data;
        console.log(Data);
        console.log("------------------");
    }
)