const googleApiKey = "AIzaSyCy-lozEInxd7-nQt_P8DCKxeePV65SJGc"
const googleApiId = "partner-pub-4707178218676583:2406864857"

/**
 * 搜索
 * @params {string} key
 * @returns {[{name, author, cover, detail}]}
 */
const search = (key) => {
    let resp = GET(`https://www.googleapis.com/customsearch/v1?cx=${googleApiId}&key=${googleApiKey}&q=${key}`)
    let result = []
    let items = JSON.parse(resp).items
    for (let item of items) {
        let pagemap = item.pagemap
        if (!pagemap) continue
        console.log(pagemap)
        let meta = pagemap.metatags[0]
        let name = meta["og:title"]
        if (!name) continue
        let author = meta["og:novel:author"]
        if (!author) continue
        result.push({
            name: name,
            author: author,
            cover: meta["og:image"],
            detail: item.link,
        })
    }
    return JSON.stringify(result)
}


/**
 * 详情
 * @params {string} url
 * @returns {[{summary, status, category, words, update, lastChapter, catalog}]}
 */
const detail = (url) => {
    let response = GET(url)
    let $ = HTML.parse(response)
    let book = {
        summary: $('#intro > p').text(),
        lastChapter: $('#info > p:nth-child(5) > a').text(),
        catalog: url
    }
    return JSON.stringify(book)
}


/**
 * 目录
 * @params {string} url
 * @returns {[{name, url, vip}]}
 */
const catalog = (url) => {
    let response = GET(url)
    let $ = HTML.parse(response)
    let array = []
    let start = false
    $('#list > dl > dd,dt').forEach((chapter) => {
        let $ = HTML.parse(chapter)
        if(start) array.push({
            name: $('a').text(),
            url: `https://www.shubaow.net${$('a').attr('href')}`
        })
        else if($('dd,dt').text().endsWith('正文')){
            start = true
        }
    })
    return JSON.stringify(array)
}


/**
 * 章节
 * @params {string} url
 * @returns {string}
 */
const chapter = (url) => {
    let response = GET(url)
    let $ = HTML.parse(response)
    return $('#content').text()
}


/**
 * 个人
 * @returns {[{url, nickname, recharge, balance[{name, coin}], sign}]}
 */
const profile = () => {
}

var bookSource = JSON.stringify({
    name: "书宝网",
    url: "shubaow.net",
    version: 100,
})