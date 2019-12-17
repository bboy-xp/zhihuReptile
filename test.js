const axios = require('axios');
const cheerio = require("cheerio");
let url = "https://www.zhihu.com/question/352899305";
let Data = {};
axios.get(url).then(
    res => {

        let html = res.data;
        let $ = cheerio.load(html, {
            decodeEntities: false
        });
        console.log("------------------");
        let content = $('p, b, blockquote').text();
        //图片
        let imgArr = [];
        $('figure').find('img').each(function (i, e) {
            let imgurl = $(this).attr("data-default-watermark-src");
            // console.log(imgurl);
            if (imgurl) {
                imgArr.push(imgurl);
            }
        });
        let data = {
            content: content,
            imgArr: imgArr
        };
        Data = data;
        console.log(Data);
    }
)